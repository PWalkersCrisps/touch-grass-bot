/* eslint-disable no-case-declarations */
import { EmbedBuilder, PermissionFlagsBits } from 'discord.js';

module.exports = {
    name: 'settings',
    description: 'View and change the server settings',
    async execute({ client, interaction, guildData }: any) {

        const verifiedRoleID = guildData.verifiedRoleID ? `<@&${guildData.verifiedRoleID}>` : 'None';
        const bannedRoleID = guildData.bannedRoleID ? `<@&${guildData.bannedRoleID}>` : 'None';
        const nsfwRoleID = guildData.nsfwRoleID ? `<@&${guildData.nsfwRoleID}>` : 'None';
        const moderationRoleIDs = guildData.moderationRoleIDs ? guildData.moderationRoleIDs.map((role: any) => `<@&${role}>`) : 'None';
        const verificationChannelID = guildData.verificationChannelID ? `<#${guildData.verificationChannelID}>` : 'None';

        if (!interaction.member.permissions.has(PermissionFlagsBits.Administrator)) return interaction.reply({ content: 'You do not have the required permissions', ephemeral: true });

        const viewSettingsEmbed: EmbedBuilder = new EmbedBuilder()
            .setTitle('Settings')
            .setDescription(`**Verified Role:** ${verifiedRoleID}\n**Unverified Role:** ${bannedRoleID}\n**NSFW Role:** ${nsfwRoleID}\n**Moderation Roles:** ${moderationRoleIDs}\n**Verification Channel:** ${verificationChannelID}`);

        switch (interaction.options.getSubcommand()) {
            case 'view':
                return interaction.reply({ embeds: [viewSettingsEmbed] });
            case 'set':
                const roleID = interaction.options.getRole('role')?.id || '';
                const channelID = interaction.options.getChannel('channel')?.id || '';

                switch (interaction.options.getSubcommand()) {
                    case 'verified-role':
                        guildData.verifiedRoleID = roleID;
                        break;
                    case 'unverified-role':
                        guildData.bannedRoleID = roleID;
                        break;
                    case 'nsfw-role':
                        guildData.nsfwRoleID = roleID;
                        break;
                    case 'add-moderation-role':
                        guildData.moderationRoleIDs.push(roleID);
                        break;
                    case 'remove-moderation-role':
                        guildData.moderationRoleIDs = guildData.moderationRoleIDs.filter((role: any) => role !== roleID);
                        break;
                    case 'reset-moderation-roles':
                        guildData.moderationRoleIDs = [];
                        break;
                    case 'verification-channel':
                        guildData.verificationChannelID = channelID;
                        break;
                }

                await guildData.save();

                return interaction.reply({ embeds: [viewSettingsEmbed] });
        }
    },
};

