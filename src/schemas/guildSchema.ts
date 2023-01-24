import { model, Schema } from 'mongoose';
export = model('guilds', new Schema({
    guildID: { type: Schema.Types.String, require: true, unique: true },
    stickyRoles: { type: Schema.Types.Boolean, default: false },
    trusted: { type: Schema.Types.Boolean, default: false },
    roles: {
        nsfwBanRole: { type: Schema.Types.String, default: null },
        nsfwRole: { type: Schema.Types.String, default: null },
        verifiedRole: { type: Schema.Types.String, default: null },
        modRoles: { type: [Schema.Types.String], default: [] },
    },
    stats: {
        nsfwBanCount: { type: Schema.Types.Number, default: 0 },
        verifyCount: { type: Schema.Types.Number, default: 0 },
    },
}));