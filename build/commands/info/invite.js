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
    name: 'invite',
    description: 'Invite the bot to your server',
    execute({ interaction }) {
        return __awaiter(this, void 0, void 0, function* () {
            const embed = new discord_js_1.EmbedBuilder()
                .setTitle('Invite the bot to your server')
                .setDescription('Click the button below to invite the bot to your server')
                .setColor(0x00ff00);
            const row = new discord_js_1.ActionRowBuilder()
                .addComponents(new discord_js_1.ButtonBuilder()
                .setStyle(discord_js_1.ButtonStyle.Link)
                .setLabel('Discord Server')
                .setURL('https://discord.gg/dgGdUBUAGG'), new discord_js_1.ButtonBuilder()
                .setStyle(discord_js_1.ButtonStyle.Link)
                .setLabel('Invite')
                .setURL('https://discord.com/api/oauth2/authorize?client_id=988495890077589544&permissions=2147534848&scope=bot%20applications.commands'));
            interaction.reply({ embeds: [embed], components: [row] });
        });
    },
};
