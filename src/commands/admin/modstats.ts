import { EmbedBuilder, GuildMember } from 'discord.js';
import modStats from '../../schemas/modStats';
import { DJSCommand } from '../../declarations';

module.exports = {
    name: 'modstats',
    description: 'Shows the modstats of a user',
    async execute({ client, interaction }: DJSCommand) {
        if (!interaction.isCommand()) return;
        if (!interaction.guild?.available) return;

        const member = (interaction.options.getMember('member') || interaction.member) as GuildMember;

        const modStatsData = await modStats.findOne({ userID: member.id, guildID: interaction.guild.id });

        if (!modStatsData) return interaction.reply({ content: 'You don\'t have any mod stats for this server', ephemeral: true });

        const modStatsEmbed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle('Mod Stats')
            .setThumbnail(member.displayAvatarURL())
            .addFields(
                { name: 'User', value: `<@${member.id}>`, inline: true },
                { name: 'NSFW Bans', value: `${modStatsData.nsfwBanCount}`, inline: true },
                { name: 'Verifications', value: `${modStatsData.verifyCount}`, inline: true },
            )
            .setTimestamp();

        interaction.reply({ embeds: [modStatsEmbed] });
    },
};
