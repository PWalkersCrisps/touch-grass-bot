import { DJSCommand } from '../../declarations';
import guildSchema from '../../schemas/guildSchema';
import { Client, EmbedBuilder, Interaction, PermissionFlagsBits, Channel, PermissionsBitField, CommandInteractionOptionResolver } from 'discord.js';

module.exports = {
    name: 'imageonly',
    description: 'Sets a channel to be image only',
    async execute({ client, interaction, profileData, guildData }: DJSCommand) {
        // Exit if not a command
        if (!interaction.isCommand()) return;
        if (!interaction.guild) return;
        if (!guildData) return;

        // Check if user has permission to manage channels
        const memberPermissions: Readonly<PermissionsBitField> = interaction.member?.permissions as Readonly<PermissionsBitField>;
        if (!(interaction.member.roles.cache.some((roleCheck: any) => guildData.roles.modRoles.includes(roleCheck.id)) || interaction.member.permissions.has(PermissionFlagsBits.ManageGuild))) {
            return interaction.reply({
                content: 'You do not have permission to use this command!',
                ephemeral: true,
            });
        }

        // Get subcommand
        const subCommand: string = interaction.options.getSubcommand();

        switch (subCommand) {
            case 'add': {
                // Get channel from options
                const channel: Channel = interaction.options.getChannel('channel');

                if (!channel) {
                    return interaction.reply({
                        content: 'Please specify a channel!',
                        ephemeral: true,
                    });
                }

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
                // Get channel from options
                const channel: Channel = interaction.options.getChannel('channel');

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