import { EmbedBuilder, GuildMember, GuildMemberRoleManager, RoleManager } from 'discord.js';
import profileSchema from '../../../schemas/profileSchema';

module.exports = {
    name: 'manualcheck',
    description: 'Manually checks a user if they have the verified/nsfwban role or not',
    async execute({ message, guildData }: MessageCommandArgs) {
        const member: GuildMember = message.mentions.users.first() || message.member;

        if (!member) return message.reply({ content: 'Please specify a member!', ephemeral: true });

        const profileData: ProfileDocument | null = await profileSchema.findOne({ userID: member.id });

        if (!profileData) return message.reply({ content: 'Cant find profile data', ephemeral: true });
        if (!guildData) return message.reply({ content: 'Cant find guild data', ephemeral: true });


        const manualCheckEmbed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle('Manual Check')
            .setThumbnail(member.displayAvatarURL())
            .addFields(
                { name: 'Verified', value: `${profileData.verify?.verified}`, inline: true },
                { name: 'NSFW Banned', value: `${profileData.nsfw?.nsfwBanned}`, inline: true },
            )
            .setTimestamp();

        const guildRoles: RoleManager = message.guild.roles;
        const memberRoles: GuildMemberRoleManager = member.roles;
        checkForVerified(guildData, profileData, guildRoles, memberRoles);
        checkForNSFWBanned(guildData, profileData, guildRoles, memberRoles);
        checkForNSFWRole(guildData, profileData, guildRoles, memberRoles);

        message.reply({ embeds: [manualCheckEmbed] });
    },
};

async function checkForVerified(guildData: GuildDocument, profileData: ProfileDocument, guildRoles: RoleManager, memberRoles: GuildMemberRoleManager) {
    if (!guildData.roles.verifiedRole) return;
    const verifiedRole = guildRoles.cache.get(guildData.roles.verifiedRole);
    if (verifiedRole && profileData.verify?.verified) {
        await memberRoles.add(verifiedRole);
    }
    else if (verifiedRole && !profileData.verify?.verified) {
        await memberRoles.remove(verifiedRole);
    }
}

async function checkForNSFWBanned(guildData: GuildDocument, profileData: ProfileDocument, guildRoles: RoleManager, memberRoles: GuildMemberRoleManager) {
    if (guildData.roles.nsfwBanRole) return;
    const nsfwBanRole = guildRoles.cache.get(guildData.roles.nsfwBanRole);
    if (nsfwBanRole && profileData.nsfw?.nsfwBanned) {
        await memberRoles.add(nsfwBanRole);
    }
    else if (nsfwBanRole && !profileData.nsfw?.nsfwBanned) {
        await memberRoles.remove(nsfwBanRole);
    }
}

async function checkForNSFWRole(guildData: GuildDocument, profileData: ProfileDocument, guildRoles: RoleManager, memberRoles: GuildMemberRoleManager) {
    if (!guildData.roles.nsfwRole) return;
    const nsfwRole = guildRoles.cache.get(guildData.roles.nsfwRole);
    if (nsfwRole && profileData.nsfw?.nsfwBanned) {
        await memberRoles.remove(nsfwRole);
    }
}