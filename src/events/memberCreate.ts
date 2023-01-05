import createDatabaseDocument = require('../modules/createDatabaseDocument');
import { EmbedBuilder } from 'discord.js';
module.exports = {
    name: 'memberCreate',
    async execute(member: any) {
        const profileData = await createDatabaseDocument.createProfileDocument(member.id);

        const guildID = member.guild.id;
        const guildData = await createDatabaseDocument.createGuildDocument(guildID);

        let description = '';

        if (profileData.verified && guildData.verifiedRoleID) {
            member.roles.add(guildData.verifiedRoleID);
            description += `You have been given the verified role: ${member.guild.roles.cache.get(guildData.verifiedRoleID).name}\n`;
        }
        if (profileData.banned && guildData.bannedRoleID) {
            member.roles.add(guildData.bannedRoleID);
            description += `You have been given the banned role: ${member.guild.roles.cache.get(guildData.bannedRoleID).name}`;
        }

        // Direct message the user
        const embed = new EmbedBuilder()
            .setTitle(`Welcome to ${member.guild.name}!`)
            .setDescription(description);
    },
};