import { model, Schema } from 'mongoose';
export = model('guilds', new Schema({
    guildID: { type: Schema.Types.String, require: true, unique: true },
    trusted: { type: Schema.Types.Boolean, default: false },
    moderationRoleIDs: { type: Schema.Types.Array, default: [] },
    verifiedRoleID: { type: Schema.Types.String, default: null },
    bannedRoleID: { type: Schema.Types.String, default: null },
    nsfwRoleID: { type: Schema.Types.String, default: null },
    logChannelID: { type: Schema.Types.String, default: null },
}));