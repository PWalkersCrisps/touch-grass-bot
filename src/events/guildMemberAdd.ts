import profileRoleSchema from '../schemas/profileRoleSchema';
import guildSchema from '../schemas/guildSchema';
module.exports = {
    name: 'guildMemberAdd',
    async execute(member: any) {

        const profileData = await profileRoleSchema.findOne({ userID: member.id });
        const guildData = await guildSchema.findOne({ guildID: member.guild.id });

        if (!profileData) return;
        if (!guildData) return;
        if (!guildData.stickyRoles) return;

        const roles: string[] = profileData.roleIDs;

        for (const role of roles) {
            const guildRole = member.guild.roles.cache.find((r: any) => r.id === role);
            if (guildRole) {
                member.roles.add(guildRole);
            }
        }

        await profileRoleSchema.findOneAndDelete({
            userID: member.id,
            guildID: member.guild.id,
        });
    },
};