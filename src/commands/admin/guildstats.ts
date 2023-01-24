import { EmbedBuilder } from 'discord.js';
import guildSchema = require('../../schemas/guildSchema');

module.exports = {
    name: 'guildstats',
    description: 'Shows the guildstats of a user',
    async execute({ client, interaction }: any) {


        const guildStatsData = await guildSchema.findOne({ guildID: interaction.guild.id });

        if (!guildStatsData) return interaction.reply({ content: 'This guild doesnt have any stats', ephemeral: true });

        const modStatsEmbed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle('Guild Stats')
            .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
            .addFields(
                { name: 'NSFW Bans', value: `${guildStatsData.stats?.nsfwBanCount}`, inline: true },
                { name: 'Verifications', value: `${guildStatsData.stats?.verifyCount}`, inline: true },
            )
            .setTimestamp();

        interaction.reply({ embeds: [modStatsEmbed] });
    },
};
