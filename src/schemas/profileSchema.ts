import { model, Schema } from 'mongoose';
export = model('profiles', new Schema({
    userID: { type: Schema.Types.String, require: true, unique: true },
    botManager: { type: Schema.Types.Boolean, default: false },
    verify: {
        verified: { type: Schema.Types.Boolean, default: false },
        verificationReason: { type: Schema.Types.String, default: 'No reason provided' },
        verificationDate: { type: Schema.Types.Date, default: null },
        verifiedBy: { type: Schema.Types.String, default: null },
    },
    nsfw: {
        nsfwBanned: { type: Schema.Types.Boolean, default: false },
        nsfwBanReason: { type: Schema.Types.String, default: 'No reason provided' },
        nsfwBanDate: { type: Schema.Types.Date, default: null },
        nsfwBannedBy: { type: Schema.Types.String, default: null },
    },
}));