import { EmbedBuilder } from 'discord.js';

module.exports = {
    name: 'verify',
    description: 'Verify a user',
    async execute({ client, interaction, profileData, guildData }: any) {

        const member = interaction.options.getMember('user');
        const reason = interaction.options.getString('reason');

        if (!member.roles.cache.some((role: any) => guildData.moderationRoleIDs.includes(role.id))) return interaction.reply({ content: 'You do not have the required permissions', ephemeral: true });
        if (!guildData.trusted) return interaction.reply({ content: 'This server is not trusted', ephemeral: true });
        if (!member) return interaction.reply({ content: 'Please specify a user to verify', ephemeral: true });

        const embed: EmbedBuilder = new EmbedBuilder()
            .setTitle('Verification')
            .setDescription(`**User:** ${member.user.tag}\n**Reason:** ${reason}`);

        const logEmbed: EmbedBuilder = new EmbedBuilder()
            .setTitle('Verification')
            .setDescription(`**User:** ${member.user.tag}\n**Reason:** ${reason}`);

        try {
            if (guildData.bannedRoleID) member.roles.remove(guildData.bannedRoleID);
            if (guildData.verifiedRoleID) member.roles.add(guildData.verifiedRoleID);
            if (guildData.logChannelID) client.channels.cache.get(guildData.logChannelID).send({ embeds: [logEmbed] });

            profileData.verified = true;

            profileData.save();

            interaction.reply({ embeds: [embed] });
        }
        catch (error) {
            console.error(error);
            return interaction.reply({ content: 'There was an error verifying the user', ephemeral: true });
        }
    },
};