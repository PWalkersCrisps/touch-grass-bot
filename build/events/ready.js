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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-var-requires */
const config_json_1 = require("../data/config.json");
const discord_js_1 = require("discord.js");
const commands = require("../data/interactionCommands");
const time_1 = __importDefault(require("../modules/time"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
module.exports = {
    name: 'ready',
    once: true,
    execute(client) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const readyMessage = `${time_1.default.currentDate} ${client.user.tag} is online, hopefully it works`;
                console.log(readyMessage);
                const rest = new discord_js_1.REST({
                    version: '9',
                }).setToken(process.env.BOT_TOKEN);
                console.log(`${time_1.default.currentDate} Started refreshing application (/) commands.`);
                yield rest.put(discord_js_1.Routes.applicationGuildCommands(config_json_1.clientID, config_json_1.testingGuildID), { body: commands });
                console.log(`${time_1.default.currentDate} Successfully reloaded application (/) commands.`);
            }
            catch (error) {
                console.error(`${time_1.default.currentDate} ready error: ${error}`);
            }
        });
    },
};
