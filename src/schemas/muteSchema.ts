import { model, Schema } from 'mongoose';
export = model('mutes', new Schema({
    guildID: { type: Schema.Types.String, require: true },
    userID: { type: Schema.Types.String, require: true },
    moderatorID: { type: Schema.Types.String, require: true },
    reason: { type: Schema.Types.String, require: true },
    date: { type: Schema.Types.Date, require: true },
    expires: { type: Schema.Types.Date, require: true },
}));