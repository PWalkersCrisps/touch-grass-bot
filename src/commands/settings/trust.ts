import { EmbedBuilder } from 'discord.js';
import profileSchema = require('../../schemas/profileSchema');
import guildSchema = require('../../schemas/guildSchema');

module.exports = {
    name: 'trust',
    description: 'Trusts a user or a guild.',
    async execute({ client, interaction, profileData }: any) {

        if (!profileData.botManager) return interaction.reply({ content: 'You do not have permission to use this command!', ephemeral: true });

        if (interaction.options.getSubcommand() === 'user') {
            const user = interaction.options.getUser('user');
            if (!user) return interaction.reply({ content: 'Please specify a user!', ephemeral: true });

            const mentionedProfileData = await profileSchema.findOne({ userID: user.id });

            await profileSchema.findOneAndUpdate({
                userID: user.id,
            }, {
                botManager: !mentionedProfileData?.botManager || true,
            }, {
                upsert: true,
            });

            const embed = new EmbedBuilder()
                .setColor('#0099ff')
                .setTitle('User Trust')
                .setDescription(`User ${user.tag} has been trusted.`)
                .setTimestamp();

            return await interaction.reply({ embeds: [embed] });

        }
        else if (interaction.options.getSubcommand() === 'guild') {

            const guildData = await guildSchema.findOne({ guildID: interaction.guild.id });

            await guildSchema.findOneAndUpdate({
                guildID: interaction.guild.id,
            }, {
                trusted: !guildData?.trusted || true,
            }, {
                upsert: true,
            });

            const embed = new EmbedBuilder()
                .setColor('#0099ff')
                .setTitle('Guild Trust')
                .setDescription(`Guild ${interaction.guild.name} has been trusted.`)
                .setTimestamp();

            return await interaction.reply({ embeds: [embed] });
        }
    },
};