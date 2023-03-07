import { model, Schema } from 'mongoose';
export = model('stats', new Schema({
    userID: { type: Schema.Types.String, require: true },
    guildID: { type: Schema.Types.String, require: true },
    nsfwBanCount: { type: Schema.Types.Number, default: 0 },
    verifyCount: { type: Schema.Types.Number, default: 0 },
    banCount: { type: Schema.Types.Number, default: 0 },
    kickCount: { type: Schema.Types.Number, default: 0 },
    muteCount: { type: Schema.Types.Number, default: 0 },
}));
