import { EmbedBuilder } from 'discord.js';
import config from '../../data/config.json';

module.exports = {
    name: 'untrust',
    description: 'Untrust a server and its moderation team',
    async execute({ interaction, guildData }: any) {

        if (!(interaction.user.id === (config.botOwner || config.botDeveloper))) return interaction.reply({ content: 'You do not have the required permissions', ephemeral: true });

        // change the trusted property to true
        guildData.trusted = false;

        // save the changes
        await guildData.save();

        // send a confirmation message
        const embed: EmbedBuilder = new EmbedBuilder()
            .setTitle('Trust')
            .setDescription('This server is now untrusted');

        interaction.reply({ embeds: [embed] });
    },
};