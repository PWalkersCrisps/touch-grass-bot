import { EmbedBuilder } from 'discord.js';
import guildSchema = require('../../schemas/guildSchema');
import { DJSCommand } from '../../declarations';

module.exports = {
    name: 'guildstats',
    description: 'Shows the guildstats of a user',
    async execute({ client, interaction }: DJSCommand) {
        if (!interaction.isCommand()) return;
        if (!interaction.guild?.available) return;
        if (!interaction.inCachedGuild()) return;
        if (!interaction.isChatInputCommand()) return;

        const guildStatsData = await guildSchema.findOne({ guildID: interaction.guild.id });

        if (!guildStatsData) return interaction.reply({ content: 'This guild doesnt have any stats', ephemeral: true });

        const modStatsEmbed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle('Guild Stats')
            .setThumbnail(interaction.guild.iconURL())
            .addFields(
                { name: 'NSFW Bans', value: `${guildStatsData.stats?.nsfwBanCount}`, inline: true },
                { name: 'Verifications', value: `${guildStatsData.stats?.verifyCount}`, inline: true },
            )
            .setTimestamp();

        interaction.reply({ embeds: [modStatsEmbed] });
    },
};
