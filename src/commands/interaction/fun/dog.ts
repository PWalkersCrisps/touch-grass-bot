import { getImage } from 'random-reddit';
import { ColorResolvable, EmbedBuilder } from 'discord.js';

module.exports = {
    name: 'dog',
    description: 'Shows a random dog image',
    async execute({ interaction }: InteractionCommandArgs) {
        const image: string = await getImage('dogpictures');

        const dogEmbed: EmbedBuilder = new EmbedBuilder()
            .setTitle('Doggo')
            .setImage(image)
            .setColor('Random' as ColorResolvable);

        interaction.reply({ embeds: [dogEmbed] });
    },
};