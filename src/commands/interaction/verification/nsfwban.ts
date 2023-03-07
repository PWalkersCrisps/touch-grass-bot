import { EmbedBuilder, Guild, GuildMember, Role, User } from 'discord.js';
import profileSchema from '../../../schemas/profileSchema';
import guildSchema from '../../../schemas/guildSchema';
import modStats = require('../../../schemas/modStats');
import log = require('../../../modules/log');
import { checkServerMod } from '../../../modules/checkPerms';

module.exports = {
    name: 'nsfwban',
    description: 'Bans a user from viewing NSFW channels.',
    async execute({ client, interaction, guildData }: InteractionCommandArgs) {
        const member = interaction.options.getMember('member') as GuildMember;
        const reason = interaction.options.getString('reason') || 'No reason provided';
        const idCheck = interaction.options.getBoolean('id') || false;
        const hide = interaction.options.getBoolean('hide') || false;

        if (!guildData) return interaction.reply({ content: 'There was an error executing this command', ephemeral: true });
        if (!checkServerMod(interaction, guildData)) return interaction.reply({ content: 'You do not have permission to use this command!', ephemeral: true });

        const { banEmbed, nsfwBanRoleEmbed, nsfwRoleEmbed, idCheckEmbed, logEmbed } = await getEmbeds(member, interaction.user, reason);

        checkForNSFWBan(interaction.guild?.roles.cache.get(guildData.roles?.nsfwBanRole), guildData, member, nsfwBanRoleEmbed);
        checkForNSFWRole(interaction.guild?.roles.cache.get(guildData.roles?.nsfwRole), guildData, member, nsfwRoleEmbed);

        if (guildData.syncExports && guildData.trusted) updateProfileSchema(member, interaction.user.id, reason);
        updateStats(interaction.user, interaction.guild as Guild);


        // if the idCheck is true, add idCheckEmbed to the embeds array
        const embeds = (idCheck) ? [banEmbed, nsfwBanRoleEmbed, nsfwRoleEmbed, idCheckEmbed] : [banEmbed, nsfwBanRoleEmbed, nsfwRoleEmbed];

        log.toServer(client, guildData, logEmbed, 'nsfwban');
        await interaction.reply({ embeds: embeds, content: `**Member porn banned:** <@${member.id}>\n**Moderator:** <@${interaction.user.id}>`, ephemeral: hide });
        await member.send({ embeds: embeds, content: `**Member porn banned:** <@${member.id}>\n**Moderator:** <@${interaction.user.id}>` });
    },
};

const checkForNSFWBan = async (NSFWBanRole: Role, guildData: GuildDocument, member: GuildMember, nsfwBanRoleEmbed: EmbedBuilder) => {
    if (!NSFWBanRole) return;
    const hasNSFWBanRole: boolean = NSFWBanRole && member.roles.cache.has(NSFWBanRole.id);
    const nsfwBanRoleChanges = hasNSFWBanRole ? `Added <@&${guildData.roles?.nsfwBanRole}> to <@${member.id}>` : 'No changes were made';
    nsfwBanRoleEmbed.setDescription(nsfwBanRoleChanges);
    await member.roles.add(guildData.roles?.nsfwBanRole);
};

const checkForNSFWRole = async (NSFWRole: Role, guildData: GuildDocument, member: GuildMember, nsfwRoleEmbed: EmbedBuilder) => {
    if (!NSFWRole) return;
    const hasNSFWRole: boolean = NSFWRole && member.roles.cache.has(NSFWRole.id);
    const nsfwRoleChanges = hasNSFWRole ? `Removed <@&${guildData.roles?.nsfwRole}> from <@${member.id}>` : 'No changes were made';
    nsfwRoleEmbed.setDescription(nsfwRoleChanges);
    await member.roles.remove(guildData.roles?.nsfwRole);
};

const updateProfileSchema = async (member: GuildMember, moderator: User, reason: string) => {

    await profileSchema.findOneAndUpdate({
        userID: member.id,
    }, {
        nsfw: {
            nsfwBanned: true,
            nsfwBanReason: reason || 'No reason provided',
            nsfwBanDate: new Date(),
            nsfwBannedBy: moderator.id,
        },
    }, {
        upsert: true,
    });
};

const updateStats = async (moderator: User, guild: Guild) => {
    await modStats.findOneAndUpdate({
        userID: moderator.id,
        guildID: guild.id,
    }, {
        $inc: {
            nsfwBanCount: 1,
        },
    }, {
        upsert: true,
    });

    await guildSchema.findOneAndUpdate({
        guildID: guild.id,
    }, {
        $inc: {
            'stats.nsfwBanCount': 1,
        },
    }, {
        upsert: true,
    });
};

function getEmbeds(member: GuildMember, moderator: GuildMember, reason: string) {
    const banEmbed = new EmbedBuilder()
        .setColor('#0099ff')
        .setTitle('NSFW Ban')
        .setThumbnail(member.user.displayAvatarURL())
        .addFields(
            { name: 'User', value: `<@${member.id}>`, inline: true },
            { name: 'Reason', value: `${reason}`, inline: true },
        )
        .setTimestamp();

    const nsfwBanRoleEmbed = new EmbedBuilder()
        .setColor('#ff0000')
        .setDescription('No NSFW ban role found');

    const nsfwRoleEmbed = new EmbedBuilder()
        .setColor('#ff0000')
        .setDescription('No NSFW role found');

    const idCheckEmbed = new EmbedBuilder()
        .setColor('#ff0000')
        .setTitle('Please DM (Direct Message) your ID or any official document that has your birthdate on it to the listed staff member.')
        .setDescription('Censor/blur out everything apart from the birthdate and make sure to send 2 pics from 2 different angles.')
        .setFooter({ text: 'Original command created by PureComedi' })
        .setTimestamp();

    const logEmbed = new EmbedBuilder()
        .setColor('#0099ff')
        .setTitle('NSFW Ban')
        .setThumbnail(member.user.displayAvatarURL())
        .addFields(
            { name: 'User', value: `<@${member.id}> ${member.user.tag}`, inline: true },
            { name: 'Reason', value: `${reason}`, inline: true },
            { name: 'Moderator', value: `<@${moderator.id}>`, inline: true },
        )
        .setTimestamp();

    return { banEmbed, nsfwBanRoleEmbed, nsfwRoleEmbed, idCheckEmbed, logEmbed };
}