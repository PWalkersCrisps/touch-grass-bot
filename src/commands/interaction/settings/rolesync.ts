import { EmbedBuilder } from 'discord.js';
import guildSchema from '../../../schemas/guildSchema';
import { checkServerMod } from '../../../modules/checkPerms';

module.exports = {
    name: 'rolesync',
    description: 'Settings on how roles are synced',
    async execute({ interaction, guildData }: InteractionCommandArgs) {
        if (!guildData) return;

        // Check if user has permission to manage channels
        if (!checkServerMod(interaction, guildData)) return interaction.reply({ content: 'You do not have permission to use this command!', ephemeral: true });

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