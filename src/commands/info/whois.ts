import { EmbedBuilder } from 'discord.js';
import profileSchema = require('../../schemas/profileSchema');

module.exports = {
    name: 'whois',
    description: 'Returns information about a user.',
    async execute({ client, interaction, profileData }: any) {

        const user = interaction.options.getUser('user') || interaction.user;
        const member = interaction.guild.members.cache.get(user.id);


        if (!profileData) return interaction.reply({ content: 'Yeah profile data is gone', ephemeral: true });

        const verified = (profileData.verify?.verified) ? [
            { name: 'Verified', value: `${profileData.verify?.verified}`, inline: true },
            { name: 'Verification Reason', value: `${profileData.verify?.verificationReason}`, inline: true },
            { name: 'Verification Date', value: `${profileData.verify?.verificationDate}`, inline: true },
            { name: 'Verified By', value: `<@${profileData.verify?.verifiedBy}>`, inline: true },
        ] : [
            { name: 'Verified', value: `${profileData.verify?.verified}`, inline: true },
        ];
        const nsfwBanned = (profileData.nsfw?.nsfwBanned) ? [
            { name: 'NSFW Banned', value: `${profileData.nsfw?.nsfwBanned}`, inline: true },
            { name: 'NSFW Ban Reason', value: `${profileData.nsfw?.nsfwBanReason}`, inline: true },
            { name: 'NSFW Ban Date', value: `${profileData.nsfw?.nsfwBanDate}`, inline: true },
            { name: 'NSFW Banned By', value: `<@${profileData.nsfw?.nsfwBannedBy}>`, inline: true },
        ] : [
            { name: 'NSFW Banned', value: `${profileData.nsfw?.nsfwBanned}`, inline: true },
        ];

        const whoisEmbed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle('User Information')
            .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
            .addFields(
                { name: 'User', value: `<@${member.id}>`, inline: true },
                { name: 'ID', value: `${member.id}`, inline: true },
                { name: 'Account Created', value: `${member.user.createdAt}`, inline: true },
                { name: 'Joined Server', value: `${member.joinedAt}`, inline: true },
                { name: 'Roles', value: `${member.roles.cache.map((role: any) => role.toString()).join(' ')}`, inline: true },

            )
            .addFields(verified)
            .addFields(nsfwBanned)
            .setTimestamp()
            .setFooter({ text: `Requested by ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) });

        interaction.reply({ embeds: [whoisEmbed] });
    },
};