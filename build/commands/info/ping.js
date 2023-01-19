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
    name: 'ping',
    description: 'Returns the bot\'s latency and API ping.',
    execute({ client, interaction }) {
        return __awaiter(this, void 0, void 0, function* () {
            interaction.reply('🏓 Pinging....').then(() => {
                const pEmbed = new discord_js_1.EmbedBuilder()
                    .setTitle('🏓 Pong!')
                    .setColor(0x0000ff)
                    .setDescription(`Latency: ${Math.floor(interaction.createdTimestamp - interaction.createdTimestamp)}ms\nAPI Latency: ${client.ws.ping}ms`);
                interaction.editReply({ embeds: [pEmbed] });
            });
        });
    },
};
