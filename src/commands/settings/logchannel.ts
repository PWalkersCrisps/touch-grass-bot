import guildSchema from '../../schemas/guildSchema';
import { EmbedBuilder } from 'discord.js';

module.exports = {
    name: 'logchannel',
    description: 'Sets the log channel for the server.',
    async execute({ interaction }: any) {

        const channel = interaction.options.getChannel('channel');

        if (!channel) return interaction.reply({ content: 'Please specify a channel!', ephemeral: true });

        await guildSchema.findOneAndUpdate({
            guildID: interaction.guild.id,
        }, {
            logChannel: channel.id,
        }, {
            upsert: true,
        });

        const embed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle('Log Channel')
            .setDescription(`Log channel has been set to ${channel}`)
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });

    },
};

