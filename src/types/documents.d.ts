/* eslint-disable no-unused-vars */
interface GuildDocument {
    guildID: string;
    stickyRoles: boolean;
    trusted: boolean;
    roles: {
        nsfwBanRole: string;
        nsfwRole: string;
        verifiedRole: string;
        modRoles: string[];
        muteRole: string;
    };
    stats: {
        nsfwBanCount: number;
        verifyCount: number;
    };
    channels: {
        nsfwBanLogChannelID: string;
        verificationLogChannelID: string;
        imageOnlyChannels: string[];
        suggestionChannelID: string;
    }
    syncImports: boolean;
    syncExports: boolean;
    prefix: string;
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

type Verify = {
    verified: boolean;
    verificationReason: string;
    verificationDate: Date;
    verifiedBy: string;
}

type NSFW = {
    nsfwBanned: boolean;
    nsfwBanReason: string;
    nsfwBanDate: Date;
    nsfwBannedBy: string;
};

interface ProfileDocument {
    userID: string;
    botManager: boolean;
    verify: Verify;
    nsfw: NSFW;
}

interface BanDocument {
    userID: string;
    guildID: string;
    moderatorID: string;
    reason: string;
    date: Date;
    expires: Date;
    permanant: boolean;
}

interface MuteDocument {
    userID: string;
    guildID: string;
    moderatorID: string;
    muted: boolean;
    reason: string;
    date: Date;
    expires: Date;
}