import { model, Schema } from 'mongoose';
export = model('bans', new Schema({
    guildID: { type: Schema.Types.String, require: true },
    userID: { type: Schema.Types.String, require: true },
    moderatorID: { type: Schema.Types.String },
    reason: { type: Schema.Types.String },
    date: { type: Schema.Types.Date },
    expires: { type: Schema.Types.Date },
    permanant: { type: Schema.Types.Boolean, default: false },
}));