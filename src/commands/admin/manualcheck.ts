import { EmbedBuilder } from 'discord.js';
import profileSchema from '../../schemas/profileSchema';
import guildSchema from '../../schemas/guildSchema';

module.exports = {
    name: 'manualcheck',
    description: 'Manually checks a user if they have the verified/nsfwban role or not',
    async execute({ client, interaction, guildData }: any) {

        const user = interaction.options.getUser('user') || interaction.user;

        if (!user) return interaction.reply({ content: 'Please specify a user!', ephemeral: true });

        const profileData = await profileSchema.findOne({ userID: user.id });

        if (!profileData) return interaction.reply({ content: 'Cant find profile data', ephemeral: true });
        if (!guildData) return interaction.reply({ content: 'Cant find guild data', ephemeral: true });


        const manualCheckEmbed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle('Manual Check')
            .setThumbnail(user.displayAvatarURL({ dynamic: true }))
            .addFields(
                { name: 'Verified', value: `${profileData.verify?.verified}`, inline: true },
                { name: 'NSFW Banned', value: `${profileData.nsfw?.nsfwBanned}`, inline: true },
            )
            .setTimestamp();

        if (guildData.roles.verifiedRole) {
            const verifiedRole = interaction.guild.roles.cache.get(guildData.roles.verifiedRole);
            if (verifiedRole && profileData.verify?.verified) {
                await interaction.guild.members.cache.get(user.id).roles.add(verifiedRole);
            }
            else if (verifiedRole && !profileData.verify?.verified) {
                await interaction.guild.members.cache.get(user.id).roles.remove(verifiedRole);
            }
        }

        if (guildData.roles.nsfwBanRole) {
            const nsfwBanRole = interaction.guild.roles.cache.get(guildData.roles.nsfwBanRole);
            if (nsfwBanRole && profileData.nsfw?.nsfwBanned) {
                await interaction.guild.members.cache.get(user.id).roles.add(nsfwBanRole);
            }
            else if (nsfwBanRole && !profileData.nsfw?.nsfwBanned) {
                await interaction.guild.members.cache.get(user.id).roles.remove(nsfwBanRole);
            }
        }

        if (guildData.roles.nsfwRole) {
            const nsfwRole = interaction.guild.roles.cache.get(guildData.roles.nsfwRole);
            if (nsfwRole && profileData.nsfw?.nsfwBanned) {
                await interaction.guild.members.cache.get(user.id).roles.remove(nsfwRole);
            }
        }

        interaction.reply({ embeds: [manualCheckEmbed] });
    },
};