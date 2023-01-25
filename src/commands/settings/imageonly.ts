import guildSchema from '../../schemas/guildSchema';
import { EmbedBuilder, PermissionFlagsBits } from 'discord.js';

module.exports = {
    name: 'imageonly',
    description: 'Sets a channel to be image only',
    async execute({ interaction, guildData }: any) {

        if (!interaction.member.permissions.has(PermissionFlagsBits.ManageChannels)) return interaction.reply({ content: 'You do not have permission to use this command!', ephemeral: true });

        switch (interaction.options.getSubcommand()) {
            case 'add': {
                const channel = interaction.options.getChannel('channel');

                if (!channel) return interaction.reply({ content: 'Please specify a channel!', ephemeral: true });

                await guildSchema.findOneAndUpdate({
                    guildID: interaction.guild.id,
                }, {
                    $push: {
                        imageOnlyChannels: channel.id,
                    },
                }, {
                    upsert: true,
                });

                const embed = new EmbedBuilder()
                    .setColor('#0099ff')
                    .setTitle('Image Only Channel')
                    .setDescription(`${channel} has been added to the image only channels`)
                    .setTimestamp();

                await interaction.reply({ embeds: [embed] });
                break;
            }
            case 'remove': {
                const channel = interaction.options.getChannel('channel');

                if (!channel) return interaction.reply({ content: 'Please specify a channel!', ephemeral: true });

                await guildSchema.findOneAndUpdate({
                    guildID: interaction.guild.id,
                }, {
                    $pull: {
                        imageOnlyChannels: channel.id,
                    },
                }, {
                    upsert: true,
                });

                const embed = new EmbedBuilder()
                    .setColor('#0099ff')
                    .setTitle('Image Only Channel')
                    .setDescription(`${channel} has been removed from the image only channels`)
                    .setTimestamp();

                await interaction.reply({ embeds: [embed] });
                break;
            }
            case 'list': {
                const embed = new EmbedBuilder()
                    .setColor('#0099ff')
                    .setTitle('Image Only Channels')
                    .setDescription(guildData.imageOnlyChannels.length > 0 ? guildData.imageOnlyChannels.map((channel: any) => `<#${channel}>`).join('\n') : 'No image only channels have been set')
                    .setTimestamp();

                await interaction.reply({ embeds: [embed] });
                break;
            }
        }
    },
};

