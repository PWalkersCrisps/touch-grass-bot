"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-var-requires */
const fs_1 = __importDefault(require("fs"));
const eventFiles = fs_1.default.readdirSync('./build/events').filter(file => file.endsWith('js')); // Gets all the files in the events folder and puts them into an array
module.exports = (client) => {
    for (const file of eventFiles) {
        const event = require(`../events/${file}`);
        if (event.once) { // If an event has a once tag it will try to make it occur once when the bot is turned on
            client.once(event.name, (...args) => event.execute(...args));
        }
        else { // If it doesnt have the once tag everything will continue as normal
            client.on(event.name, (...args) => event.execute(...args));
        }
    }
};
