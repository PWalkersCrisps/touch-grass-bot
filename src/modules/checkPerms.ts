import { Guild, GuildMember, Interaction, PermissionFlagsBits, Role } from 'discord.js';

export function checkServerMod(interaction: Interaction, guildData: GuildDocument) {
    if (!interaction.inCachedGuild()) return;
    if (!(interaction.member?.roles.cache.some((role: Role) => guildData.roles.modRoles.includes(role.id)) || interaction.member?.permissions.has(PermissionFlagsBits.ManageGuild))) {
        return false;
    }
    return true;
}

export function checkForVerifiedRole(guildDocument: GuildDocument, guild: Guild, member: GuildMember, verify: Verify) {
    if (!guildDocument.roles.verifiedRole) return;

    const verifiedRole = guild.roles.cache.get(guildDocument.roles.verifiedRole);

    if (verifiedRole && verify.verified) {
        member.roles.add(verifiedRole);
    }
    else if (verifiedRole && !verify.verified) {
        member.roles.remove(verifiedRole);
    }

}

export function checkForNSFWBanRole(guildDocument: GuildDocument, guild: Guild, member: GuildMember, nsfw: NSFW) {
    if (!guildDocument.roles.nsfwBanRole) return;

    const nsfwBanRole = guild.roles.cache.get(guildDocument.roles.nsfwBanRole);

    if (nsfwBanRole && nsfw.nsfwBanned) {
        member.roles.add(nsfwBanRole);
    }
    else if (nsfwBanRole && !nsfw.nsfwBanned) {
        member.roles.remove(nsfwBanRole);
    }

}

export function checkForNSFWRole(guildDocument: GuildDocument, guild: Guild, member: GuildMember, nsfw: NSFW) {
    if (!guildDocument.roles.nsfwRole) return;

    const nsfwRole = guild.roles.cache.get(guildDocument.roles.nsfwRole);

    if (nsfwRole && nsfw.nsfwBanned) {
        member.roles.remove(nsfwRole);
    }
}