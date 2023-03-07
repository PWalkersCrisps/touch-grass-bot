import profileRoleSchema from '../schemas/profileRoleSchema';
import guildSchema from '../schemas/guildSchema';
import { GuildMember, Events } from 'discord.js';
module.exports = {
    name: Events.GuildMemberRemove,
    async execute(member: GuildMember) {

        const guildData = await guildSchema.findOne({ guildID: member.guild.id });

        if (!guildData) return;
        if (!guildData.stickyRoles) return;

        const roles: string[] = [];

        member.roles.cache.forEach((role: any) => {
            roles.push(role.id);
        });

        await profileRoleSchema.findOneAndUpdate({
            userID: member.id,
            guildID: member.guild.id,
        }, {
            userID: member.id,
            guildID: member.guild.id,
            roleIDs: roles,
        }, {
            upsert: true,
        });
    },
};