import { EmbedBuilder } from 'discord.js';

module.exports = {
    name: 'trust',
    description: 'Trust a server and its moderation team',
    async execute({ interaction, guildData }: any) {

        // change the trusted property to true
        guildData.trusted = true;

        // save the changes
        await guildData.save();

        // send a confirmation message
        const embed: EmbedBuilder = new EmbedBuilder()
            .setTitle('Trust')
            .setDescription('This server is now trusted');

        interaction.reply({ embeds: [embed] });
    },
};