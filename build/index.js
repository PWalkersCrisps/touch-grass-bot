"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-shadow */
const discord_js_1 = require("discord.js"); // Import the Client, Collection, and Intents modules from discord.js
const fs_1 = require("fs"); // Import the readdirSync method from the fs module
const path_1 = require("path"); // Import the resolve method from the path module
const mongoose_1 = require("mongoose"); // Import the connect method from the mongoose module
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)(); // Load environment variables from the .env file
// Connect to the MongoDB server using the URI specified in the MONGODB_SRV environment variable
(0, mongoose_1.connect)(process.env.MONGODB_SRV);
const client = new discord_js_1.Client({
    intents: [
        discord_js_1.GatewayIntentBits.Guilds,
    ],
    shards: 'auto',
});
exports.default = { client }; // Export the client object
client.commands = new discord_js_1.Collection(); // Create a new Collection for the commands
client.categories = (0, fs_1.readdirSync)((0, path_1.resolve)('./build/commands')); // Makes the sub-directories in ./commands/* into their own categories
// For each of the two handlers, require the handler file and run it
['command', 'event'].forEach((handler) => {
    require((0, path_1.resolve)(`./build/handlers/${handler}`))(client);
});
// Log in to the Discord API using the bot token specified in the BOT_TOKEN environment variable
client.login(process.env.BOT_TOKEN);
