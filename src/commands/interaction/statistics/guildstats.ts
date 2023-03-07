import { EmbedBuilder } from 'discord.js';

module.exports = {
    name: 'guildstats',
    description: 'Shows the guildstats of a user',
    async execute({ interaction, guildData }: InteractionCommandArgs) {

        const modStatsEmbed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle('Guild Stats')
            .setThumbnail(interaction.guild.iconURL())
            .addFields(
                { name: 'NSFW Bans', value: `${guildData?.stats?.nsfwBanCount}`, inline: true },
                { name: 'Verifications', value: `${guildData?.stats?.verifyCount}`, inline: true },
            )
            .setTimestamp();

        interaction.reply({ embeds: [modStatsEmbed] });
    },
};
