import guildSchema from '../../schemas/guildSchema';
import { EmbedBuilder } from 'discord.js';

module.exports = {
    name: 'serverinfo',
    description: 'Shows info about the server.',
    async execute({ interaction }: any) {

        const guild = interaction.guild;
        const guildData = await guildSchema.findOne({ guildID: guild.id });
        if (!guildData) return interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });

        const embed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle(guild.name)
            .setThumbnail(guild.iconURL({ dynamic: true }))
            .addFields(
                { name: 'Owner', value: `<@${guild.ownerId}>`, inline: true },
                { name: 'Members', value: `${guild.memberCount}`, inline: true },
                { name: 'Sticky Roles', value: `${guildData.stickyRoles}`, inline: true },
            )
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    },
};

