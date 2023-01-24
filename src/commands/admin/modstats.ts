import { EmbedBuilder } from 'discord.js';
import modStats from '../../schemas/modStats';

module.exports = {
    name: 'modstats',
    description: 'Shows the modstats of a user',
    async execute({ client, interaction }: any) {

        const user = interaction.options.getUser('user') || interaction.user;

        const modStatsData = await modStats.findOne({ userID: user.id, guildID: interaction.guild.id });

        if (!modStatsData) return interaction.reply({ content: 'You don\'t have any mod stats for this server', ephemeral: true });

        const modStatsEmbed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle('Mod Stats')
            .setThumbnail(user.displayAvatarURL({ dynamic: true }))
            .addFields(
                { name: 'User', value: `<@${user.id}>`, inline: true },
                { name: 'NSFW Bans', value: `${modStatsData.nsfwBanCount}`, inline: true },
                { name: 'Verifications', value: `${modStatsData.verifyCount}`, inline: true },
            )
            .setTimestamp();

        interaction.reply({ embeds: [modStatsEmbed] });
    },
};
