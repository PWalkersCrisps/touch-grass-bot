/* eslint-disable @typescript-eslint/no-var-requires */
import { Client, Collection, GatewayIntentBits } from 'discord.js';
import { readdirSync } from 'fs';
import { resolve } from 'path';
export class TouchGrassClient extends Client {
    commands: Collection<unknown, any>; // Collection of registered commands
    buttons: Collection<unknown, any>; // Collection of registered buttons
    messageCommands: Collection<unknown, any>; // Collection of registered message commands
    alias: Collection<unknown, any>; // Collection of registered aliases
    categories: string[]; // Array of command categories
    messageCommandCategories: string[]; // Array of message command categories
    data: any[]; // Array of data (unclear what this is used for)

    constructor() {
        super({
            intents: [
                GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildMembers,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.GuildBans,
                GatewayIntentBits.MessageContent,
            ],
            shards: 'auto',
        });
        this.commands = new Collection<string, any>(); // Create a new Collection for the commands
        this.buttons = new Collection<string, any>(); // Create a new Collection for the buttons
        this.messageCommands = new Collection<string, any>(); // Create a new Collection for the message commands
        this.alias = new Collection<string, any>(); // Create a new Collection for the aliases
        this.categories = readdirSync(resolve('./build/commands/interaction')); // Read the command categories
        this.messageCommandCategories = readdirSync(resolve('./build/commands/message')); // Read the message command categories
        this.data = []; // Create a new array for slash command data
    }

    async start() {
        // For each of the two handlers, require the handler file and run it
        ['interactionCommand', 'messageCommand', 'buttons', 'event'].forEach((handler) => {
            require(resolve(`./build/handlers/${handler}`))(this);
        });

        this.login(process.env.NODE_ENV === 'production' ? process.env.BOT_TOKEN : process.env.DEV_BOT_TOKEN);

    }

    async stop() {
        this.destroy();
    }

    async reload() {
        this.stop();
        this.start();
    }
}