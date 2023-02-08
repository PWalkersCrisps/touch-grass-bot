import { EmbedBuilder, PermissionFlagsBits } from 'discord.js';
import profileSchema = require('../../schemas/profileSchema');
import modStats = require('../../schemas/modStats');
import guildSchema = require('../../schemas/guildSchema');
import log = require('../../modules/log');
import { DJSCommand } from '../../declarations';

module.exports = {
    name: 'verify',
    description: 'Verifies a user or unverifies a user if they are already verified.',
    async execute({ client, interaction, profileData, guildData }: DJSCommand) {

        const user = interaction.options.getUser('user');
        const reason = interaction.options.getString('reason');
        const hide = interaction.options.getBoolean('hide');

        if (!guildData) return interaction.reply({ content: 'There was an error executing this command', ephemeral: true });
        if (!guildData.trusted) return interaction.reply({ content: 'This guild is not trusted!', ephemeral: true });

        if (!(interaction.member.roles.cache.some((role: any) => guildData.roles?.modRoles.includes(role.id)) || interaction.member.permissions.has(PermissionFlagsBits.ManageGuild))) {
            return interaction.reply({ content: 'You do not have permission to use this command!', ephemeral: true });
        }

        if (!user) return interaction.reply({ content: 'Please specify a user!', ephemeral: true });

        const mentionedProfileData = await profileSchema.findOne({ userID: user.id });

        if (!mentionedProfileData) return interaction.reply({ content: 'There was an error executing this command', ephemeral: true });

        if (interaction.guild.roles.cache.has(guildData.roles?.verifiedRole)) {

            if (mentionedProfileData.verify?.verified) {
                await interaction.guild.members.cache.get(user.id).roles.remove(guildData.roles?.verifiedRole);
            }
            else {
                await interaction.guild.members.cache.get(user.id).roles.add(guildData.roles?.verifiedRole);
            }
        }

        if (guildData.syncExports) {
            await profileSchema.findOneAndUpdate({
                userID: user.id,
            }, {
                verify: {
                    verified: !mentionedProfileData.verify?.verified || true,
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
            .setTitle('User Verification')
            .setDescription(`User ${user.tag} has been ${mentionedProfileData.verify?.verified ? 'unverified' : 'verified'}.`)
            .addFields(
                { name: 'Reason', value: reason || 'No reason provided.' }
            )
            .setTimestamp();

        const logEmbed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle('NSFW Ban')
            .setThumbnail(user.user.displayAvatarURL({ dynamic: true }))
            .addFields(
                { name: 'User', value: `<@${user.id}>`, inline: true },
                { name: 'Reason', value: `${reason}`, inline: true },
                { name: 'Moderator', value: `<@${interaction.user.id}>`, inline: true },
            )
            .setTimestamp();

        log.toServer(client, guildData, logEmbed);
        return await interaction.reply({ embeds: [embed], ephemeral: hide });
    },
};