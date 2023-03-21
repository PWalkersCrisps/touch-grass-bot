import { Guild, GuildMember, Interaction, Message, PermissionFlagsBits, Role } from 'discord.js';
import log from './log';

export function checkServerMod(interaction: Interaction, guildData: GuildDocument) {
    if (!interaction.inCachedGuild()) return;
    if (!(interaction.member?.roles.cache.some((role: Role) => guildData.roles.modRoles.includes(role.id)) || interaction.member?.permissions.has(PermissionFlagsBits.ManageGuild))) {
        return false;
    }
    return true;
}

export function checkServerModMessage(message: Message, guildData: GuildDocument) {
    if (!message.guild) return;
    if (!(message.member?.roles.cache.some((role: Role) => guildData.roles.modRoles.includes(role.id)) || message.member?.permissions.has(PermissionFlagsBits.ManageGuild))) {
        return false;
    }
    return true;
}

export function checkForVerifiedRole(guildDocument: GuildDocument, guild: Guild, member: GuildMember, verify: Verify) {
    if (!guildDocument.roles.verifiedRole) return;

    console.log(`Checking if ${member.user.tag} has verified role in ${guild.name}...`);

    try {

        const verifiedRole = guild.roles.cache.get(guildDocument.roles.verifiedRole);
        console.log(`Got the verified role: ${verifiedRole?.name} (${verifiedRole?.id})`);

        if (verifiedRole && verify.verified) {
            member.roles.add(verifiedRole);
        }
        else if (verifiedRole && !verify.verified) {
            member.roles.remove(verifiedRole);
        }
    }
    catch (err) {
        log(err, 'error');
    }


}

export function checkForNSFWBanRole(guildDocument: GuildDocument, guild: Guild, member: GuildMember, nsfw: NSFW) {
    if (!guildDocument.roles.nsfwBanRole) return;

    console.log(`Checking if ${member.user.tag} has nsfw ban role in ${guild.name}...`);

    try {

        const nsfwBanRole = guild.roles.cache.get(guildDocument.roles.nsfwBanRole);

        if (nsfwBanRole && nsfw.nsfwBanned) {
            member.roles.add(nsfwBanRole);
        }
        else if (nsfwBanRole && !nsfw.nsfwBanned) {
            member.roles.remove(nsfwBanRole);
        }
    }
    catch (err) {
        log(err, 'error');
    }

}

export function checkForNSFWRole(guildDocument: GuildDocument, guild: Guild, member: GuildMember, nsfw: NSFW) {
    if (!guildDocument.roles.nsfwRole) return;

    console.log(`Checking if ${member.user.tag} has nsfw role in ${guild.name}...`);

    try {

        const nsfwRole = guild.roles.cache.get(guildDocument.roles.nsfwRole);

        if (nsfwRole && nsfw.nsfwBanned) {
            member.roles.remove(nsfwRole);
        }
    }
    catch (err) {
        log(err, 'error');
    }
}