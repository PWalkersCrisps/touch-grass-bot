import { EmbedBuilder } from 'discord.js';

module.exports = {
    name: 'unverify',
    description: 'Unverify a user incase of a mistake',
    async execute({ client, interaction, profileData, guildData }: any) {

        const member = interaction.options.getMember('user');
        const reason = interaction.options.getString('reason');
        const ban = interaction.options.getBoolean('ban');

        if (!member.roles.cache.some((role: any) => guildData.moderationRoleIDs.includes(role.id))) return interaction.reply({ content: 'You do not have the required permissions', ephemeral: true });
        if (!guildData.trusted) return interaction.reply({ content: 'This server is not trusted', ephemeral: true });
        if (!member) return interaction.reply({ content: 'Please specify a user to unverify', ephemeral: true });

        const embed: EmbedBuilder = new EmbedBuilder()
            .setTitle('Unverification')
            .setDescription(`**User:** ${member.user.tag}\n**Reason:** ${reason}`);

        const logEmbed: EmbedBuilder = new EmbedBuilder()
            .setTitle('Unverification')
            .setDescription(`**User:** ${member.user.tag}\n**Reason:** ${reason}`);

        try {
            if (ban && guildData.bannedRoleID) member.roles.add(guildData.bannedRoleID);
            if (guildData.verifiedRoleID) member.roles.remove(guildData.verifiedRoleID);
            if (guildData.nsfwRoleID) member.roles.remove(guildData.nsfwRoleID);
            if (guildData.logChannelID) client.channels.cache.get(guildData.logChannelID).send({ embeds: [logEmbed] });

            profileData.verified = false;

            profileData.save();

            interaction.reply({ embeds: [embed] });
        }
        catch (error) {
            console.error(error);
            return interaction.reply({ content: 'There was an error verifying the user', ephemeral: true });
        }
    },
};