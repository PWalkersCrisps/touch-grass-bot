import { EmbedBuilder, Message } from 'discord.js';

module.exports = {
    name: 'ping',
    description: 'Returns the bot\'s latency and API ping.',
    async execute({ client, interaction }: InteractionCommandArgs) {
        interaction.reply({ content: '🏓 Pinging....', fetchReply: true }).then((msg: Message) => {
            const pEmbed: EmbedBuilder = new EmbedBuilder()
                .setTitle('🏓 Pong!')
                .setColor(0x0000ff)
                .setDescription(`Latency: ${Math.floor(msg.createdTimestamp - interaction.createdTimestamp)}ms\nAPI Latency: ${client.ws.ping}ms`);
            interaction.editReply({ embeds: [pEmbed] });
        });
    },
};