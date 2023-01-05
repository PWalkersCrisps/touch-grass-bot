import { EmbedBuilder } from 'discord.js';
import log = require('../../modules/log');

module.exports = {
    name: 'check',
    description: 'Do an identification check on a user',
    async execute({ client, interaction, profileData, guildData }: any) {

        const member = interaction.options.getMember('user');
        const reason = interaction.options.getString('reason');

        if (!member.roles.cache.some((role: any) => guildData.moderationRoleIDs.includes(role.id))) return interaction.reply({ content: 'You do not have the required permissions', ephemeral: true });
        if (!guildData.trusted) return interaction.reply({ content: 'This server is not trusted', ephemeral: true });
        if (!member) return interaction.reply({ content: 'Please specify a user to identify', ephemeral: true });
        if (member.id === interaction.user.id) return interaction.reply({ content: 'You can\'t identify yourself!', ephemeral: true });
        if (member.id === client.user.id) return interaction.reply({ content: 'You can\'t identify me!', ephemeral: true });

        const embed: EmbedBuilder = new EmbedBuilder()
            .setTitle('Identification Check')
            .setDescription(`**User:** ${member.user.tag}\n**Reason:** ${reason}`)
            .addFields(
                { name: '**To verify:**', value: `Please DM (Direct Message) your ID or any official document that has your birthdate on it to a staff member\nCensor/blur out everything apart from the birthdate, put a bit of paper next to the id with your tag: ${interaction.user.tag} and make sure to send 2 pics from 2 different angles.` },
                { name: '**Role changes:**', value: `${member.roles.cache.some((role: any) => role.id === guildData.nsfwRoleID) ? `Removed <@&${guildData.nsfwRoleID}>` : 'No changes to roles made'}\n${member.roles.cache.some((role: any) => role.id === guildData.bannedRoleID) ? `Removed <@&${guildData.bannedRoleID}>` : 'No changes to roles made'}` },
            );

        try {
            if (guildData.nsfwRoleID) member.roles.remove(guildData.nsfwRoleID);
            if (guildData.bannedRoleID) member.roles.add(guildData.bannedRoleID);

            log.toServer(client, member, reason, guildData);

            profileData.verified = false;

            profileData.save();

            interaction.reply({ embeds: [embed] });
        }
        catch (error) {
            console.error(error);
            return interaction.reply({ content: 'There was an error identifying the user', ephemeral: true });
        }
    },
};