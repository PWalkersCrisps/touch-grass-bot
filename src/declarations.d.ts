import { Client, Interaction } from 'discord.js';

interface GuildDocument {
    guildID: string;
    stickyRoles: boolean;
    trusted: boolean;
    roles: {
        nsfwBanRole: string;
        nsfwRole: string;
        verifiedRole: string;
        modRoles: string[];
    };
    stats: {
        nsfwBanCount: number;
        verifyCount: number;
    };
    logChannelId: string;
    imageOnlyChannels: string[];
}

interface ModStatsDocument {
    userID: string;
    guildID: string;
    nsfwBanCount: number;
    verifyCount: number;
}

interface ProfileRoleDocument {
    userID: string;
    guildID: string;
    roleIDs: string[];
}

interface ProfileDocument {
    userID: string;
    botManager: boolean;
    verify: {
        verified: boolean;
        verificationReason: string;
        verificationDate: Date;
        verifiedBy: string;
    };
    nsfw: {
        nsfwBanned: boolean;
        nsfwBanReason: string;
        nsfwBanDate: Date;
        nsfwBannedBy: string;
    };
}

interface DJSCommand {
    client: Client;
    interaction: any;
    profileData: ProfileDocument;
    guildData: GuildDocument | undefined;
}