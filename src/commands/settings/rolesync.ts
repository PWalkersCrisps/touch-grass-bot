import { EmbedBuilder, PermissionsBitField, PermissionFlagsBits } from 'discord.js';
import { DJSCommand } from '../../declarations';
import guildSchema from '../../schemas/guildSchema';

module.exports = {
    name: 'rolesync',
    description: 'Settings on how roles are synced',
    async execute({ client, interaction, profileData, guildData }: DJSCommand) {
        // Exit if not a command
        if (!interaction.isCommand()) return;
        if (!interaction.guild) return;
        if (!interaction.inCachedGuild()) return;
        if (!interaction.isChatInputCommand()) return;
        if (!guildData) return;

        // Check if user has permission to manage channels
        const memberPermissions: Readonly<PermissionsBitField> = interaction.member?.permissions as Readonly<PermissionsBitField>;
        if (!(interaction.member.roles.cache.some((roleCheck: any) => guildData.roles.modRoles.includes(roleCheck.id)) || interaction.member.permissions.has(PermissionFlagsBits.ManageGuild))) {
            return interaction.reply({
                content: 'You do not have permission to use this command!',
                ephemeral: true,
            });
        }

        // Get subcommand
        const subCommand: string = interaction.options.getSubcommand();
        const choice: string = interaction.options.getString('choice') as string;
        if (!choice) return interaction.reply({ content: 'Please specify a choice!', ephemeral: true });
        switch (subCommand) {
            case 'import':
                await guildSchema.findOneAndUpdate({
                    guildID: interaction.guild?.id,
                }, {
                    syncImport: (choice === 'on' ? true : false),
                }, {
                    upsert: true,
                });
                break;
            case 'export':
                await guildSchema.findOneAndUpdate({
                    guildID: interaction.guild?.id,
                }, {
                    syncExport: (choice === 'on' ? true : false),
                }, {
                    upsert: true,
                });
                break;

        }

        // Send confirmation message
        const embed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle('Role Sync Settings')
            .setDescription('Role sync settings have been updated')
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });

    },
};