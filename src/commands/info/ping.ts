import { EmbedBuilder } from 'discord.js';

module.exports = {
    name: 'ping',
    description: 'Returns the bot\'s latency and API ping.',
    async execute({ client, interaction }: any) {
        interaction.reply('🏓 Pinging....').then(() => {
            const pEmbed: EmbedBuilder = new EmbedBuilder()
                .setTitle('🏓 Pong!')
                .setColor(0x0000ff)
                .setDescription(
                    `Latency: ${Math.floor(
                        interaction.createdTimestamp - interaction.createdTimestamp,
                    )}ms\nAPI Latency: ${client.ws.ping}ms`,
                );
            interaction.editReply({ embeds: [pEmbed] });
        });
    },
};