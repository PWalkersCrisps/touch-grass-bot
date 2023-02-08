import { model, Schema } from 'mongoose';
export = model('profileRoles', new Schema({
    userID: { type: Schema.Types.String, require: true },
    guildID: { type: Schema.Types.String, require: true },
    roleIDs: { type: [Schema.Types.String], default: [] },
}));

