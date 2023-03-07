import { EmbedBuilder, Guild } from 'discord.js';

module.exports = {
    name: 'serverinfo',
    description: 'Shows info about the server.',
    async execute({ interaction, guildData }: InteractionCommandArgs) {
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

