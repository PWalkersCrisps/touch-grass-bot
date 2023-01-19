"use strict";
const mongoose_1 = require("mongoose");
module.exports = (0, mongoose_1.model)('profiles', new mongoose_1.Schema({
    userID: { type: mongoose_1.Schema.Types.String, require: true, unique: true },
    registeredAt: { type: mongoose_1.Schema.Types.Date, default: Date.now() },
    verified: { type: mongoose_1.Schema.Types.Boolean, default: false },
    minor: { type: mongoose_1.Schema.Types.Boolean, default: false }, // I fucking hate these people
}));
