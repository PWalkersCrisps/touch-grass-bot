import guildSchema from '../../../schemas/guildSchema';
import { EmbedBuilder, Channel } from 'discord.js';

module.exports = {
    name: 'logchannel',
    description: 'Sets the log channel for the server.',
    async execute({ interaction }: InteractionCommandArgs) {
        const channel: Channel = interaction.options.getChannel('channel') as Channel;
        const type: string = interaction.options.getString('type') as string;

        if (!channel) return interaction.reply({ content: 'Please specify a channel!', ephemeral: true });
        if (!channel.isTextBased()) return interaction.reply({ content: 'Please specify a text channel!', ephemeral: true });

        if (type === 'nsfwban') {
            await guildSchema.findOneAndUpdate({
                guildID: interaction.guild.id,
            }, {
                nsfwBanLogChannelID: channel.id,
            }, {
                upsert: true,
            });
        }
        else if (type === 'verify') {
            await guildSchema.findOneAndUpdate({
                guildID: interaction.guild.id,
            }, {
                verificationLogChannelID: channel.id,
            }, {
                upsert: true,
            });
        }
        else {
            return interaction.reply({ content: 'Please specify a valid type!', ephemeral: true });
        }


        const embed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle('Log Channel')
            .setDescription(`${(type === 'nsfwban' ? 'NSFW Ban' : 'Verify')} log channel has been set to ${channel}`)
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });

    },
};

