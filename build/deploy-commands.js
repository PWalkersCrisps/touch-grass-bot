"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-var-requires */
const discord_js_1 = require("discord.js");
const v9_1 = require("discord-api-types/v9");
const config_json_1 = require("./data/config.json"); // Import the client ID and guild ID from the config file
const fs_1 = require("fs"); // Import the file system module
const index_1 = __importDefault(require("./index")); // Import the client from the index file
const commands = index_1.default.client.data;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)(); // Loads the .env file
const commandFiles = (0, fs_1.readdirSync)('./commands').filter(file => file.endsWith('')); // Get all files in commands folder
for (const file of commandFiles) { // Loop through all files in the commands folder
    const command = require(`./commands/${file}`); // Current file
    commands.push(command.data.toJSON()); // Add the command to the commands array
}
const rest = new discord_js_1.REST({ version: '9' }).setToken(process.env.BOT_TOKEN); // Set's rest client to use the bot's token
rest.put(v9_1.Routes.applicationCommands(config_json_1.clientID), { body: commands }) // Push the commands to the guild
    .then(() => console.log('Successfully registered application commands.')) // Log success
    .catch(console.error); // Log error
