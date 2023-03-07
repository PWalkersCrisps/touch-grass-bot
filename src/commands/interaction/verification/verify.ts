import { EmbedBuilder, Guild, GuildMember, User } from 'discord.js';
import profileSchema = require('../../../schemas/profileSchema');
import modStats = require('../../../schemas/modStats');
import guildSchema = require('../../../schemas/guildSchema');
import log = require('../../../modules/log');
import { checkServerMod } from '../../../modules/checkPerms';

module.exports = {
    name: 'verify',
    description: 'Verifies a user.',
    async execute({ client, interaction, guildData }: InteractionCommandArgs) {
        const member: GuildMember = interaction.options.getMember('member') as GuildMember;
        const reason: string = interaction.options.getString('reason') || 'No reason provided.';
        const hide: boolean = interaction.options.getBoolean('hide') || false;

        if (!guildData) return interaction.reply({ content: 'There was an error executing this command', ephemeral: true });
        if (!guildData.trusted) return interaction.reply({ content: 'This guild is not trusted!', ephemeral: true });

        if (!checkServerMod(interaction, guildData)) return interaction.reply({ content: 'You do not have permission to use this command!', ephemeral: true });

        if (!member) return interaction.reply({ content: 'Please specify a member!', ephemeral: true });

        const { verifyEmbed, logEmbed } = getEmbeds(member, interaction.user, reason);

        if (interaction.guild.roles.cache.has(guildData.roles?.verifiedRole)) await member.roles.add(guildData.roles?.verifiedRole);
        if (interaction.guild.roles.cache.has(guildData.roles?.nsfwBanRole)) await member.roles.remove(guildData.roles?.nsfwBanRole);

        if (guildData.syncExports && guildData.trusted) updateProfileSchema(member, interaction.user.id, reason);
        updateStats(interaction.user, interaction.guild as Guild);

        log.toServer(client, guildData, logEmbed, 'verify');
        return await interaction.reply({ embeds: [verifyEmbed], ephemeral: hide });
    },
};

const updateProfileSchema = async (member: GuildMember, moderator: User, reason: string) => {
    await profileSchema.findOneAndUpdate({
        userID: member.id,
    }, {
        verify: {
            verified: true,
            verificationReason: reason || 'No reason provided.',
            verifiedBy: moderator.id,
            verificationDate: Date.now(),
        },
        nsfw: {
            nsfwBanned: false,
        },
    }, {
        upsert: true,
    });
};

async function updateStats(moderator: User, guild: Guild) {
    await modStats.findOneAndUpdate({
        userID: moderator.id,
        guildID: guild.id,
    }, {
        $inc: {
            verifyCount: 1,
        },
    }, {
        upsert: true,
    });

    await guildSchema.findOneAndUpdate({
        guildID: moderator.id,
    }, {
        $inc: {
            'stats.verifyCount': 1,
        },
    }, {
        upsert: true,
    });
}

function getEmbeds(member: GuildMember, moderator: GuildMember, reason: string) {
    const verifyEmbed = new EmbedBuilder()
        .setColor('#0099ff')
        .setTitle('Member Verification')
        .setDescription(`Member <@${member.id}> has been verified.`)
        .addFields(
            { name: 'Reason', value: reason || 'No reason provided.' }
        )
        .setTimestamp();

    const logEmbed = new EmbedBuilder()
        .setColor('#0099ff')
        .setTitle('Verification')
        .setThumbnail(member.user.displayAvatarURL())
        .addFields(
            { name: 'Member', value: `<@${member.id}>`, inline: true },
            { name: 'Reason', value: reason || 'No reason provided.', inline: true },
            { name: 'Moderator', value: `<@${moderator.id}>`, inline: true },
        )
        .setTimestamp();

    return { verifyEmbed, logEmbed };
}