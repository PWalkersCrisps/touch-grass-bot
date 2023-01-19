import guildSchema from '../../schemas/guildSchema';
import { EmbedBuilder } from 'discord.js';

module.exports = {
    name: 'serverinfo',
    description: 'Shows info about the server.',
    async execute({ client, interaction, guildData }: any) {

        const guild = interaction.guild;

        const embed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle(guild.name)
            .setThumbnail(guild.iconURL({ dynamic: true }))
            .addFields(
                { name: 'Owner', value: guild.owner, inline: true },
                { name: 'Members', value: guild.memberCount, inline: true },
                { name: 'Sticky Roles', value: guildData.stickyRoles, inline: true },
            )
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    },
};

