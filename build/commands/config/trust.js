"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
module.exports = {
    name: 'trust',
    description: 'Trust a server and its moderation team',
    execute({ client, interaction, guildData }) {
        return __awaiter(this, void 0, void 0, function* () {
            // change the trusted property to true
            guildData.trusted = true;
            // save the changes
            yield guildData.save();
            // send a confirmation message
            const embed = new discord_js_1.EmbedBuilder()
                .setTitle('Trust')
                .setDescription('This server is now trusted');
            interaction.reply({ embeds: [embed] });
        });
    },
};
