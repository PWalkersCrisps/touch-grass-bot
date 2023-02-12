import { DJSCommand } from '../../declarations';
import guildSchema from '../../schemas/guildSchema';
import { Client, Interaction, EmbedBuilder } from 'discord.js';

module.exports = {
    name: 'logchannel',
    description: 'Sets the log channel for the server.',
    async execute({ client, interaction, profileData, guildData }: DJSCommand) {
        if (!interaction.isCommand()) return;
        if (!interaction.guild?.available) return;

        const channel = interaction.options.getChannel('channel');
        const type = interaction.options.getString('type');

        if (!channel) return interaction.reply({ content: 'Please specify a channel!', ephemeral: true });

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

