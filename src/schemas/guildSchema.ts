import { model, Schema } from 'mongoose';
export = model('guilds', new Schema({
    guildID: { type: Schema.Types.String, require: true, unique: true },
}));