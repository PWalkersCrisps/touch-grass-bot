import { getImage } from 'random-reddit';
import { ColorResolvable, EmbedBuilder } from 'discord.js';

module.exports = {
    name: 'cat',
    description: 'Shows a random cat image',
    async execute({ interaction }: InteractionCommandArgs) {
        const image: string = await getImage('cats');

        const catEmbed: EmbedBuilder = new EmbedBuilder()
            .setTitle('Catto')
            .setImage(image)
            .setColor('Random' as ColorResolvable);

        interaction.reply({ embeds: [catEmbed] });
    },
};