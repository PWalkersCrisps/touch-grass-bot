"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const discord_js_1 = require("discord.js");
const config_json_1 = __importDefault(require("../data/config.json"));
module.exports = {
    toServer: function (client, member, reason, guildData) {
        const logEmbed = new discord_js_1.EmbedBuilder()
            .setTitle('Verification')
            .setDescription(`**User:** ${member.user.tag}\n**Reason:** ${reason}`);
        if (guildData.logChannelID)
            client.channels.cache.get(guildData.logChannelID).send({ embeds: [logEmbed] });
        if (config_json_1.default.logChannelID)
            client.channels.cache.get(config_json_1.default.logChannelID).send({ embeds: [logEmbed] });
    },
    console: function (input) {
        console.log(input);
        // write to log file
        const logFile = path_1.default.join(__dirname, `../../logs/${new Date().toDateString()}.log`);
        fs_1.default.appendFile(logFile, `${new Date().toLocaleString()} - ${input}\n`, (error) => {
            if (error)
                console.error(error);
        });
    },
};
