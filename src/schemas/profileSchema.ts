import { model, Schema } from 'mongoose';
export = model('profiles', new Schema({
    userID: { type: Schema.Types.String, require: true, unique: true },
    registeredAt: { type: Schema.Types.Date, default: Date.now() },
    verified: { type: Schema.Types.Boolean, default: false },
    minor: { type: Schema.Types.Boolean, default: false }, // I fucking hate these people
}));

