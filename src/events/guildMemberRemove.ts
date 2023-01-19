import profileSchema from '../schemas/profileSchema';
module.exports = {
    name: 'guildMemberRemove',
    async execute(member: any) {

        const roles: string[] = [];

        member.roles.cache.forEach((role: any) => {
            roles.push(role.name);
        });

        await profileSchema.findOneAndUpdate({
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