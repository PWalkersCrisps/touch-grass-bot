import { EmbedBuilder, Guild, GuildMember, User } from 'discord.js';
import profileSchema = require('../../../schemas/profileSchema');
import modStats = require('../../../schemas/modStats');
import guildSchema = require('../../../schemas/guildSchema');
import log = require('../../../modules/log');
import { checkServerModMessage } from '../../../modules/checkPerms';

module.exports = {
    name: 'verify',
    description: 'Verifies a user.',
    async execute({ client, message, args, guildData }: MessageCommandArgs) {
        const member = message.mentions.members.first();
        const reason = args.slice(1).join(' ') || 'No reason provided';

        if (!member) return message.reply({ content: 'Please specify a member!', ephemeral: true });
        if (!guildData) return message.reply({ content: 'There was an error executing this command', ephemeral: true });
        if (!guildData.trusted) return message.reply({ content: 'This guild is not trusted!', ephemeral: true });

        if (!checkServerModMessage(message, guildData)) return message.reply({ content: 'You do not have permission to use this command!', ephemeral: true });

        if (!member) return message.reply({ content: 'Please specify a member!', ephemeral: true });

        const { verifyEmbed, logEmbed } = getEmbeds(member, message.member, reason);

        if (message.guild.roles.cache.has(guildData.roles?.verifiedRole)) await member.roles.add(guildData.roles?.verifiedRole);
        if (message.guild.roles.cache.has(guildData.roles?.nsfwBanRole)) await member.roles.remove(guildData.roles?.nsfwBanRole);

        if (guildData.syncExports && guildData.trusted) updateProfileSchema(member, message.member.id, reason);
        updateStats(message.member, message.guild as Guild);

        log.toServer(client, guildData, logEmbed, 'verify');
        return await message.reply({ embeds: [verifyEmbed] });
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
        .setThumbnail(member.user.displayAvatarURL())
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