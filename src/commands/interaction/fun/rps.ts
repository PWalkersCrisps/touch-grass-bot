import { ColorResolvable, EmbedBuilder } from 'discord.js';
import { rps } from '../../../modules/rps';

module.exports = {
    name: 'rps',
    description: 'Play rock paper scissors with the bot',
    async execute({ interaction }: InteractionCommandArgs) {
        const choice: RPS = interaction.options.getString('choice');

        const description = rps(interaction, choice);

        const embed: EmbedBuilder = new EmbedBuilder()
            .setTitle('Rock Paper Scissors')
            .setDescription(description)
            .setColor('Random' as ColorResolvable);

        interaction.reply({ embeds: [embed] });
    },
};