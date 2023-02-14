import { Interaction, PermissionFlagsBits } from 'discord.js';
import { GuildDocument } from '../types/declarations';

export function checkServerMod(interaction: Interaction, guildData: GuildDocument) {
    if (!interaction.inCachedGuild()) return;
    if (!(interaction.member?.roles.cache.some((role: any) => guildData.roles.modRoles.includes(role.id)) || interaction.member?.permissions.has(PermissionFlagsBits.ManageGuild))) {
        return false;
    }
    return true;
}