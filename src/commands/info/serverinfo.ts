import { DJSCommand } from '../../declarations';
import guildSchema from '../../schemas/guildSchema';
import { Client, Interaction, EmbedBuilder, Guild } from 'discord.js';

module.exports = {
    name: 'serverinfo',
    description: 'Shows info about the server.',
    async execute({ client, interaction, profileData, guildData }: DJSCommand) {
        if (!interaction.isCommand()) return;
        if (!interaction.guild?.available) return;
        if (!guildData) return interaction.reply({ content: 'There is no Guild Data', ephemeral: true });

        const guild: Guild = interaction.guild;

        const embed: EmbedBuilder = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle(guild.name)
            .setThumbnail(guild.iconURL())
            .addFields(
                { name: 'Owner', value: `<@${guild.ownerId}>`, inline: true },
                { name: 'Members', value: `${guild.memberCount}`, inline: true },
                { name: 'Sticky Roles', value: `${guildData.stickyRoles}`, inline: true },
            )
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    },
};

