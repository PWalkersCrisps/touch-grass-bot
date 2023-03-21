import profileRoleSchema from '../schemas/profileRoleSchema';
import guildSchema from '../schemas/guildSchema';
import { GuildMember, Events } from 'discord.js';
import { client } from '..';
module.exports = {
    name: Events.GuildMemberAdd,
    async execute(member: GuildMember) {

        const profileData = await profileRoleSchema.findOne({ userID: member.id });
        const guildData = await guildSchema.findOne({ guildID: member.guild.id });

        if (!profileData) return;
        if (!guildData) return;
        if (!guildData.stickyRoles) return;

        const roles: string[] = profileData.roleIDs;
        const clientMember: GuildMember | undefined = member.guild.members.cache.get(client.user?.id as string);
        if (!clientMember) return;

        for (const role of roles) {
            const guildRole = member.guild.roles.cache.find((r: any) => r.id === role);
            if (!guildRole) continue;
            if (guildRole.position >= clientMember.roles?.highest?.position) continue;
            if (member.guild.roles.everyone.id === guildRole.id) continue;
            try {
                member.roles.add(guildRole);
            }
            catch (err) {
                console.log(err);
            }
        }

        await profileRoleSchema.findOneAndDelete({
            userID: member.id,
            guildID: member.guild.id,
        });
    },
};