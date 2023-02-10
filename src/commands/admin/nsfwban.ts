import { EmbedBuilder, PermissionFlagsBits } from 'discord.js';
import profileSchema from '../../schemas/profileSchema';
import guildSchema from '../../schemas/guildSchema';
import modStats = require('../../schemas/modStats');
import log = require('../../modules/log');
import config from '../../data/config.json';

module.exports = {
    name: 'nsfwban',
    description: 'Bans a user from viewing NSFW channels.',
    async execute({ client, interaction, guildData }: any) {

        const member = interaction.options.getMember('user');
        const reason = interaction.options.getString('reason') || 'No reason provided';
        const idCheck = interaction.options.getBoolean('id') || false;
        const hide = interaction.options.getBoolean('hide') || false;

        if (!guildData) return interaction.reply({ content: 'There was an error executing this command', ephemeral: true });
        if (!guildData.trusted) return interaction.reply({ content: 'This guild is not trusted!', ephemeral: true });

        if (!(interaction.member.roles.cache.some((role: any) => guildData.roles.modRoles.includes(role.id)) || interaction.member.permissions.has(PermissionFlagsBits.ManageGuild))) {
            return interaction.reply({ content: 'You do not have permission to use this command!', ephemeral: true });
        }

        const mentionedProfileData = await profileSchema.findOne({ userID: member.id });

        if (!mentionedProfileData) return interaction.reply({ content: 'There was an error executing this command', ephemeral: true });

        const banEmbed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle('NSFW Ban')
            .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
            .addFields(
                { name: 'User', value: `<@${member.id}>`, inline: true },
                { name: 'Reason', value: `${reason}`, inline: true },
            )
            .setTimestamp();

        const nsfwBanRoleEmbed = new EmbedBuilder()
            .setColor('#ff0000')
            .setDescription('No NSFW ban role found');

        const nsfwRoleEmbed = new EmbedBuilder()
            .setColor('#ff0000')
            .setDescription('No NSFW role found');

        const idCheckEmbed = new EmbedBuilder()
            .setColor('#ff0000')
            .setTitle('Please DM (Direct Message) your ID or any official document that has your birthdate on it to the listed staff member.')
            .setDescription('Censor/blur out everything apart from the birthdate and make sure to send 2 pics from 2 different angles.')
            .setFooter({ text: 'Original command created by PureComedi' })
            .setTimestamp();

        const logEmbed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle('NSFW Ban')
            .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
            .addFields(
                { name: 'User', value: `<@${member.id}>`, inline: true },
                { name: 'Reason', value: `${reason}`, inline: true },
                { name: 'Moderator', value: `<@${interaction.user.id}>`, inline: true },
            )
            .setTimestamp();

        // Give the member the NSFW ban role if it exists
        // Check if member is in this guild

        if (interaction.guild.roles.cache.has(guildData.nsfwBanRole) && interaction.guild.members.cache.has(member.id)) {
            await member.roles.add(guildData.nsfwBanRole);
            const nsfwBanRoleChanges = (member.roles.cache.has(guildData.nsfwBanRole)) ? `Added <@&${guildData.nsfwBanRole}> to <@${member.id}>` : 'No changes were made';

            nsfwBanRoleEmbed.setDescription(nsfwBanRoleChanges);
        }

        // Remove the member from the NSFW role if it exists in guild
        if (interaction.guild.roles.cache.has(guildData.roles?.nsfwRole)) {
            await member.roles.remove(guildData.nsfwRole);

            const nsfwRoleChanges = (member.roles.cache.has(guildData.nsfwRole)) ? `Removed <@&${guildData.nsfwRole}> from <@${member.id}>` : 'No changes were made';

            nsfwRoleEmbed.setDescription(nsfwRoleChanges);
        }

        if (guildData.syncExports) {
            await profileSchema.findOneAndUpdate({
                userID: member.id,
            }, {
                nsfw: {
                    nsfwBanned: true,
                    nsfwBanReason: reason || 'No reason provided',
                    nsfwBanDate: new Date(),
                    nsfwBannedBy: interaction.user.id,
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
                nsfwBanCount: 1,
            },
        }, {
            upsert: true,
        });

        await guildSchema.findOneAndUpdate({
            guildID: interaction.guild.id,
        }, {
            $inc: {
                'stats.nsfwBanCount': 1,
            },
        }, {
            upsert: true,
        });

        // if the idCheck is true, add idCheckEmbed to the embeds array
        const embeds = (idCheck) ? [banEmbed, nsfwBanRoleEmbed, nsfwRoleEmbed, idCheckEmbed] : [banEmbed, nsfwBanRoleEmbed, nsfwRoleEmbed];

        log.toServer(client, guildData, logEmbed);
        await interaction.reply({ embeds: embeds, content: `**Member porn banned:** <@${member.id}>\n**Moderator:** <@${interaction.user.id}>`, ephemeral: hide });
        await member.send({ embeds: embeds, content: `**Member porn banned:** <@${member.id}>\n**Moderator:** <@${interaction.user.id}>` });
    },
};