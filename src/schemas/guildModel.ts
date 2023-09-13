import { model, Schema, Document } from 'mongoose';

export interface IGuild extends Document {
    guildId: string;
    channelIds: {
        imageOnlyChannels: string[];
    }
    roleIds: {
        modRoles: string[];
    }
    settings: {
        prefix: string;
        stickyRoles: boolean;
    }
}

export const guildSchema = new Schema({
    guildId: { type: Schema.Types.String, required: true },
    channelIds: {
        imageOnlyChannels: { type: [Schema.Types.String], default: [] },
    },
    roleIds: {
        modRoles: { type: [Schema.Types.String], default: [] },
    },
    settings: {
        prefix: { type: Schema.Types.String, default: '!' },
        stickyRoles: { type: Schema.Types.Boolean, default: false },
    },
}, { timestamps: true });

const GuildModel = model<IGuild>('guilds', guildSchema);

class GuildSettings {
    guildId: string;
    channelIds: {
        imageOnlyChannels: string[];
    };
    roleIds: {
        modRoles: string[];
    };
    settings: {
        prefix: string;
        stickyRoles: boolean;
    };


    constructor(guildId: string) {
        this.guildId = guildId;
        this.channelIds = {
            imageOnlyChannels: [],
        };
        this.roleIds = {
            modRoles: [],
        };
        this.settings = {
            prefix: '!',
            stickyRoles: false,
        };
    }

    async save(): Promise<IGuild> {
        const guild = new GuildModel({
            guildId: this.guildId,
            channelIds: this.channelIds,
            roleIds: this.roleIds,
            settings: this.settings,
        });

        return guild.save();
    }

    static async getGuildById(guildId: string): Promise<IGuild | null> {
        return GuildModel.findOne({ guildId });
    }

    static async getAllGuilds(): Promise<IGuild[]> {
        return GuildModel.find();
    }
}

export default GuildSettings;