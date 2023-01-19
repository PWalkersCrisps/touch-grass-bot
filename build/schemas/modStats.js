"use strict";
const mongoose_1 = require("mongoose");
module.exports = (0, mongoose_1.model)('stats', new mongoose_1.Schema({
    userID: { type: mongoose_1.Schema.Types.String, require: true, unique: true },
    guildID: { type: mongoose_1.Schema.Types.String, require: true, unique: true },
    idCount: { type: mongoose_1.Schema.Types.Number, default: 0 },
    verifyCount: { type: mongoose_1.Schema.Types.Number, default: 0 },
}));
