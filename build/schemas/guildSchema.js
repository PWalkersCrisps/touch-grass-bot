"use strict";
const mongoose_1 = require("mongoose");
module.exports = (0, mongoose_1.model)('guilds', new mongoose_1.Schema({
    guildID: { type: mongoose_1.Schema.Types.String, require: true, unique: true },
    trusted: { type: mongoose_1.Schema.Types.Boolean, default: false },
    moderationRoleIDs: { type: mongoose_1.Schema.Types.Array, default: [] },
    verifiedRoleID: { type: mongoose_1.Schema.Types.String, default: null },
    unverifiedRoleID: { type: mongoose_1.Schema.Types.String, default: null },
    nsfwRoleID: { type: mongoose_1.Schema.Types.String, default: null },
    logChannelID: { type: mongoose_1.Schema.Types.String, default: null },
}));
