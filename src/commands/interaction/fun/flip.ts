import { ColorResolvable, EmbedBuilder } from 'discord.js';

module.exports = {
    name: 'flip',
    description: 'Flips a coin',
    async execute({ interaction }: InteractionCommandArgs) {
        const coin: string[] = ['Heads', 'Tails'];
        const result: string = Math.random() >= 0.5 ? coin[0] : coin[1];


        const flipEmbed: EmbedBuilder = new EmbedBuilder()
            .setTitle('Coin Flip')
            .setDescription(`The coin landed on **${result}**`)
            .setColor(result === 'Heads' ? 'Green' as ColorResolvable : 'Red' as ColorResolvable);

        interaction.reply({ embeds: [flipEmbed] });
    },
};