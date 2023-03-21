import { EmbedBuilder, Guild, GuildMember, Role, User } from 'discord.js';
import profileSchema from '../../../schemas/profileSchema';
import guildSchema from '../../../schemas/guildSchema';
import modStats = require('../../../schemas/modStats');
import log = require('../../../modules/log');
import { checkServerModMessage } from '../../../modules/checkPerms';

module.exports = {
    name: 'id',
    description: 'Bans a user from viewing NSFW channels whilst ID checking them.',
    async execute({ client, message, args, guildData }: MessageCommandArgs) {
        const member = message.mentions.members.first();
        const reason = args.slice(1).join(' ') || 'No reason provided';

        if (!member) return message.reply({ content: 'Please specify a member!', ephemeral: true });
        if (!guildData) return message.reply({ content: 'There was an error executing this command', ephemeral: true });
        if (!checkServerModMessage(message, guildData)) return message.reply({ content: 'You do not have permission to use this command!', ephemeral: true });

        const { banEmbed, nsfwBanRoleEmbed, nsfwRoleEmbed, idCheckEmbed, logEmbed } = await getEmbeds(member, message.member, reason);

        checkForNSFWBan(message.guild?.roles.cache.get(guildData.roles?.nsfwBanRole), guildData, member, nsfwBanRoleEmbed);
        checkForNSFWRole(message.guild?.roles.cache.get(guildData.roles?.nsfwRole), guildData, member, nsfwRoleEmbed);

        if (guildData.syncExports && guildData.trusted) updateProfileSchema(member, message.author.id, reason);
        updateStats(message.author, message.guild as Guild);


        // if the idCheck is true, add idCheckEmbed to the embeds array
        const embeds = [banEmbed, nsfwBanRoleEmbed, nsfwRoleEmbed, idCheckEmbed];

        log.toServer(client, guildData, logEmbed, 'nsfwban');
        await message.reply({ embeds: embeds, content: `**Member porn banned:** <@${member.id}>\n**Moderator:** <@${message.member.id}>` });
        await member.send({ embeds: embeds, content: `**Member porn banned:** <@${member.id}>\n**Moderator:** <@${message.member.id}>` });
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