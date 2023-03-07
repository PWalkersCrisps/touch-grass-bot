import { EmbedBuilder, GuildMember } from 'discord.js';
import profileSchema = require('../../../schemas/profileSchema');

module.exports = {
    name: 'whois',
    description: 'Returns information about a user.',
    async execute({ interaction }: InteractionCommandArgs) {
        const member: GuildMember = (interaction.options.getMember('member') || interaction.member) as GuildMember;

        const profileData = await profileSchema.findOne({ userID: member.id });

        if (!profileData) return interaction.reply({ content: 'Yeah profile data is gone', ephemeral: true });

        const verified = (profileData.verify?.verified) ? [
            { name: 'Verified', value: `${profileData.verify?.verified}`, inline: false },
            { name: 'Verification Reason', value: `${profileData.verify?.verificationReason}`, inline: true },
            { name: 'Verification Date', value: `${profileData.verify?.verificationDate}`, inline: true },
            { name: 'Verified By', value: `<@${profileData.verify?.verifiedBy}>`, inline: true },
        ] : [
            { name: 'Verified', value: `${profileData.verify?.verified}`, inline: true },
        ];
        const nsfwBanned = (profileData.nsfw?.nsfwBanned) ? [
            { name: 'NSFW Banned', value: `${profileData.nsfw?.nsfwBanned}`, inline: false },
            { name: 'NSFW Ban Reason', value: `${profileData.nsfw?.nsfwBanReason}`, inline: true },
            { name: 'NSFW Ban Date', value: `${profileData.nsfw?.nsfwBanDate}`, inline: true },
            { name: 'NSFW Banned By', value: `<@${profileData.nsfw?.nsfwBannedBy}>`, inline: true },
        ] : [
            { name: 'NSFW Banned', value: `${profileData.nsfw?.nsfwBanned}`, inline: false },
        ];

        const memberRoles = member.roles.cache.map((role: any) => {
            if (role.id === member.guild.id) return;
            role.toString();
        }).join(' ');

        const whoisEmbed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle('User Information')
            .setThumbnail(member.user.displayAvatarURL())
            .addFields(
                { name: 'User', value: `<@${member.id}>`, inline: true },
                { name: 'ID', value: `${member.id}`, inline: true },
                { name: 'Account Created', value: `${member.user.createdAt}`, inline: false },
                { name: 'Joined Server', value: `${member.joinedAt}`, inline: true },
                { name: 'Roles', value: `${memberRoles}`, inline: false },
                ...verified,
                ...nsfwBanned,
            )
            .setTimestamp()
            .setFooter({ text: `Requested by ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL() });

        interaction.reply({ embeds: [whoisEmbed] });
    },
};