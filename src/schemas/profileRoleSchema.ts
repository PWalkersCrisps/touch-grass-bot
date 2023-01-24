import { model, Schema } from 'mongoose';
export = model('profileRoles', new Schema({
    userID: { type: Schema.Types.String, require: true, unique: true },
    guildID: { type: Schema.Types.String, require: true, unique: true },
    roleIDs: { type: [Schema.Types.String], default: [] },
}));

