import profileSchema from '../schemas/profileSchema';
module.exports = {
    name: 'guildMemberRemove',
    async execute(member: any) {

        const profileData = await profileSchema.findOne({ userID: member.id });

        if (!profileData) return;

        const roles: string[] = profileData.roleIDs;

        for (const role of roles) {
            const guildRole = member.guild.roles.cache.find((r: any) => r.name === role);
            if (guildRole) {
                member.roles.add(guildRole);
            }
        }

        await profileSchema.findOneAndDelete({
            userID: member.id,
            guildID: member.guild.id,
        });
    },
};
