declare module 'ascii-table';
declare module 'weighted-random';

interface ProfileDocument {
    userId: string;
    registeredAt: Date;
    verified: boolean;
    banned: boolean
}

interface GuildDocument {
    guildId: string;
    trusted: boolean;
    moderationRoleIDs: string[];
    verifiedRoleID: string;
    bannedRoleID: string;
    nsfwRoleID: string;
    logChannelID: string;
}