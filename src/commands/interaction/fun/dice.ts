import { ColorResolvable, EmbedBuilder } from 'discord.js';

module.exports = {
    name: 'dice',
    description: 'Rolls a dice',
    async execute({ interaction }: InteractionCommandArgs) {
        const diceEmbed: EmbedBuilder = new EmbedBuilder()
            .setTitle('Dice')
            .setDescription(`You rolled a ${Math.floor(Math.random() * 6) + 1}`)
            .setColor('Random' as ColorResolvable);

        interaction.reply({ embeds: [diceEmbed] });
    },
};