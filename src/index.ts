/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-shadow */
import { Client, Collection, GatewayIntentBits } from 'discord.js'; // Import the Client, Collection, and Intents modules from discord.js
import { readdirSync } from 'fs'; // Import the readdirSync method from the fs module
import { resolve } from 'path'; // Import the resolve method from the path module
import { connect } from 'mongoose'; // Import the connect method from the mongoose module

import { config } from 'dotenv';
config(); // Load environment variables from the .env file

// Add a new property to the Discord.js Client class
declare module 'discord.js' {
    export interface Client {
        commands: Collection<unknown, any>, // Collection of registered commands
        categories: string[], // Array of command categories
        data: any[] // Array of data (unclear what this is used for)
    }
}

// Connect to the MongoDB server using the URI specified in the MONGODB_SRV environment variable
connect(process.env.MONGODB_SRV as string);

const client = new Client({ // Create a new Discord client
    intents: [
        GatewayIntentBits.Guilds,
    ],
    shards: 'auto',
});

export default { client }; // Export the client object

client.commands = new Collection<string, any>(); // Create a new Collection for the commands
client.categories = readdirSync(resolve('./build/commands')); // Makes the sub-directories in ./commands/* into their own categories

// For each of the two handlers, require the handler file and run it
['command', 'event'].forEach((handler) => {
    require(resolve(`./build/handlers/${handler}`))(client);
});

// Log in to the Discord API using the bot token specified in the BOT_TOKEN environment variable
client.login(process.env.BOT_TOKEN);
