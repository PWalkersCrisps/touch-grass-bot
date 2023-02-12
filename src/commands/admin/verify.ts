import { EmbedBuilder, PermissionFlagsBits } from 'discord.js';
import profileSchema = require('../../schemas/profileSchema');
import modStats = require('../../schemas/modStats');
import guildSchema = require('../../schemas/guildSchema');
import log = require('../../modules/log');
import { DJSCommand, ProfileDocument } from '../../declarations';

module.exports = {
    name: 'verify',
    description: 'Verifies a user or unverifies a user if they are already verified.',
    async execute({ client, interaction, profileData, guildData }: DJSCommand) {

        const member = interaction.options.getMember('user');
        const reason = interaction.options.getString('reason');
        const hide = interaction.options.getBoolean('hide');

        if (!guildData) return interaction.reply({ content: 'There was an error executing this command', ephemeral: true });
        if (!guildData.trusted) return interaction.reply({ content: 'This guild is not trusted!', ephemeral: true });

        if (!(interaction.member.roles.cache.some((role: any) => guildData.roles?.modRoles.includes(role.id)) || interaction.member.permissions.has(PermissionFlagsBits.ManageGuild))) {
            return interaction.reply({ content: 'You do not have permission to use this command!', ephemeral: true });
        }

        if (!member) return interaction.reply({ content: 'Please specify a member!', ephemeral: true });

        if (interaction.guild.roles.cache.has(guildData.roles?.verifiedRole) && interaction.guild.members.cache.has(member.id)) {
            await member.roles.add(guildData.roles?.verifiedRole);
        }

        if (guildData.syncExports) {
            await profileSchema.findOneAndUpdate({
                userID: member.id,
            }, {
                verify: {
                    verified: true,
                    verificationReason: reason || 'No reason provided.',
                    verifiedBy: interaction.user.id,
                    verificationDate: Date.now(),
                },
            }, {
                upsert: true,
            });
        }

        await modStats.findOneAndUpdate({
            userID: interaction.user.id,
            guildID: interaction.guild.id,
        }, {
            $inc: {
                verifyCount: 1,
            },
        }, {
            upsert: true,
        });

        await guildSchema.findOneAndUpdate({
            guildID: interaction.guild.id,
        }, {
            $inc: {
                'stats.verifyCount': 1,
            },
        }, {
            upsert: true,
        });

        const embed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle('Member Verification')
            .setDescription(`Member <@${member.id}> has been verified.`)
            .addFields(
                { name: 'Reason', value: reason || 'No reason provided.' }
            )
            .setTimestamp();

        const logEmbed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle('Verification')
            .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
            .addFields(
                { name: 'Member', value: `<@${member.id}>`, inline: true },
                { name: 'Reason', value: `${reason}`, inline: true },
                { name: 'Moderator', value: `<@${interaction.user.id}>`, inline: true },
            )
            .setTimestamp();

        log.toServer(client, guildData, logEmbed);
        return await interaction.reply({ embeds: [embed], ephemeral: hide });
    },
};