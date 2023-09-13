import { Events, GuildMember } from 'discord.js';
import BotEvent from '../classes/event';
import { config } from 'dotenv';
import ProfileRoles from '../schemas/profileRolesSchema';

config();

class GuildMemberRemove extends BotEvent {

    constructor() {
        super();
        this.name = Events.GuildMemberRemove;
    }

    async execute(member: GuildMember) {

        ProfileRoles.setRoleIDs(member.id, member.guild.id, member.roles.cache.map(role => role.id));
    }
}

export default new GuildMemberRemove();