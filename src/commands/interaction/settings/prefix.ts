import { EmbedBuilder } from 'discord.js';
import guildSchema from '../../../schemas/guildSchema';

module.exports = {
    name: 'prefix',
    description: 'Sets the prefix for the server.',
    async execute({ interaction, guildData }: InteractionCommandArgs) {
        if (!guildData) return interaction.reply({ content: 'There is no Guild Data', ephemeral: true });

        const newPrefix: string = interaction.options.getString('prefix');

        if (!newPrefix) return interaction.reply({ content: 'Please provide a prefix', ephemeral: true });

        if (newPrefix.length > 5) return interaction.reply({ content: 'Prefixes can only be 5 characters long', ephemeral: true });

        const guildID: string = interaction.guild.id;

        await guildSchema.findOneAndUpdate({
            guildID,
        }, {
            prefix: newPrefix,
        }, {
            upsert: true,
        });

        const prefixEmbed: EmbedBuilder = new EmbedBuilder()
            .setTitle('Prefix Set!')
            .setColor(0x0000ff)
            .setDescription(`The prefix has been set to \`${newPrefix}\``);

        await interaction.reply({ embeds: [prefixEmbed] });
    },
};