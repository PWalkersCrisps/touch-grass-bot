import { checkServerMod } from '../../../modules/checkPerms';
import guildSchema from '../../../schemas/guildSchema';
import { EmbedBuilder, Channel } from 'discord.js';

module.exports = {
    name: 'imageonly',
    description: 'Sets a channel to be image only',
    async execute({ interaction, guildData }: InteractionCommandArgs) {
        if (!guildData) return;

        if (!checkServerMod(interaction, guildData)) return interaction.reply({ content: 'You do not have permission to use this command!', ephemeral: true });

        const subCommand: string = interaction.options.getSubcommand();
        switch (subCommand) {
            case 'add': {
                // Get channel from options
                const channel: Channel = interaction.options.getChannel('channel') as Channel;
                if (!channel) return interaction.reply({ content: 'Please specify a channel!', ephemeral: true });
                if (!channel.isTextBased()) return interaction.reply({ content: 'Please specify a text channel!', ephemeral: true });

                // Add channel to imageOnlyChannels array
                await guildSchema.findOneAndUpdate({
                    guildID: interaction.guild?.id,
                }, {
                    $push: {
                        imageOnlyChannels: channel.id,
                    },
                }, {
                    upsert: true,
                });

                // Send confirmation message
                const embed = new EmbedBuilder()
                    .setColor('#0099ff')
                    .setTitle('Image Only Channel')
                    .setDescription(`${channel} has been added to the image only channels`)
                    .setTimestamp();

                await interaction.reply({ embeds: [embed] });
                break;
            }
            case 'remove': {
                const channel: Channel = interaction.options.getChannel('channel') as Channel;
                if (!channel) return interaction.reply({ content: 'Please specify a channel!', ephemeral: true });
                if (!channel.isTextBased()) return interaction.reply({ content: 'Please specify a text channel!', ephemeral: true });

                if (!channel) {
                    return interaction.reply({
                        content: 'Please specify a channel!',
                        ephemeral: true,
                    });
                }

                // Remove channel from imageOnlyChannels array
                await guildSchema.findOneAndUpdate({
                    guildID: interaction.guild?.id,
                }, {
                    $pull: {
                        imageOnlyChannels: channel.id,
                    },
                }, {
                    upsert: true,
                });

                // Send confirmation message
                const embed = new EmbedBuilder()
                    .setColor('#0099ff')
                    .setTitle('Image Only Channel')
                    .setDescription(`${channel} has been removed from the image only channels`)
                    .setTimestamp();

                await interaction.reply({ embeds: [embed] });
                break;
            }
            case 'list': {
                if (!guildData) {
                    return interaction.reply({
                        content: 'No guild data found!',
                        ephemeral: true,
                    });
                }

                // List image only channels
                const embed = new EmbedBuilder()
                    .setColor('#0099ff')
                    .setTitle('Image Only Channels')
                    .setDescription(guildData.imageOnlyChannels.length > 0
                        ? guildData.imageOnlyChannels.map((channel: any) => `<#${channel}>`).join('\n')
                        : 'No image only channels have been set')
                    .setTimestamp();

                await interaction.reply({ embeds: [embed] });
                break;
            }
        }
    },
};