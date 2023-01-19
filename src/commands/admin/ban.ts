import { EmbedBuilder } from 'discord.js';

module.exports = {
    name: 'ban',
    description: 'bans a user from not using any verification locked channels',
    async execute({ client, interaction, profileData, guildData }: any) {

        const member = interaction.options.getMember('user');
        const reason = interaction.options.getString('reason');

        if (!member.roles.cache.some((role: any) => guildData.moderationRoleIDs.includes(role.id))) return interaction.reply({ content: 'You do not have the required permissions', ephemeral: true });
        if (!guildData.trusted) return interaction.reply({ content: 'This server is not trusted', ephemeral: true });
        if (!member) return interaction.reply({ content: 'Please specify a user to ban', ephemeral: true });

        const embed: EmbedBuilder = new EmbedBuilder()
            .setTitle('Ban')
            .setDescription(`**User:** ${member.user.tag}\n**Reason:** ${reason}`);

        const logEmbed: EmbedBuilder = new EmbedBuilder()
            .setTitle('Ban')
            .setDescription(`**User:** ${member.user.tag}\n**Reason:** ${reason}`);

        try {
            if (guildData.bannedRoleID) member.roles.add(guildData.bannedRoleID);
            if (guildData.nsfwRoleID) member.roles.remove(guildData.nsfwRoleID);
            if (guildData.logChannelID) client.channels.cache.get(guildData.logChannelID).send({ embeds: [logEmbed] });

            profileData.banned = true;

            profileData.save();

            interaction.reply({ embeds: [embed] });
        }
        catch (error) {
            console.error(error);
            return interaction.reply({ content: 'There was an error banning the user', ephemeral: true });
        }
    },
};