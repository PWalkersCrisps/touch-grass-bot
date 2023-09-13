import { Events, GuildMember } from 'discord.js';
import BotEvent from '../classes/event';
import { config } from 'dotenv';
import ProfileRoles from '../schemas/profileRolesSchema';

config();

class GuildMemberAdd extends BotEvent {

    constructor() {
        super();
        this.name = Events.GuildMemberAdd;
    }

    async execute(member: GuildMember) {

        const roleIDs: string[] = await ProfileRoles.getRoleIDs(member.id, member.guild.id);

        if (!roleIDs) {
            return;
        }

        for (const roleID of roleIDs) {
            const role = member.guild.roles.cache.get(roleID);
            if (role) {
                member.roles.add(role);
            }
        }
    }
}

export default new GuildMemberAdd();