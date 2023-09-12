import { Client, Collection, GatewayIntentBits } from 'discord.js';
import BotHandler, { Handlers } from './handler';
import { readdirSync } from 'fs';
import { join, resolve } from 'path';
import { runAtMultipleSpecificTimes } from '../modules/timedEvents';

// Custom client class that extends the Discord.js Client class
export class BotClient extends Client {
    // Collections of registered commands, buttons, and aliases
    interactionCommands: Collection<string, any>;
    messageCommands: Collection<string, any>;
    buttons: Collection<string, any>;
    selectMenus: Collection<string, any>;
    aliases: Collection<string, any>;
    // Array of command categories
    categories: string[];
    // Array of slash command data
    data: any[];
    // Miscellaneous properties
    cooldowns: Collection<string, Collection<string, number>>;

    constructor() {
        // Call the constructor of the base Client class with options for the client
        super({
            intents: [
                GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildMembers,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.MessageContent,
            ],
            shards: 'auto',
            allowedMentions: { parse: ['roles', 'users'] },
        });

        // Create new collections for commands, buttons, and aliases
        this.interactionCommands = new Collection<string, any>();
        this.messageCommands = new Collection<string, any>();
        this.buttons = new Collection<string, any>();
        this.selectMenus = new Collection<string, any>();
        this.aliases = new Collection<string, any>();

        // Initialize the categories array with an empty array
        this.categories = [];

        // Create a new array for slash command data
        this.data = [];

        // Create a new collection for cooldowns
        this.cooldowns = new Collection<string, Collection<string, number>>();

        // Load the command categories
        this.loadCommandCategories();
    }

    // Start the bot
    async start() {
        // Register command and event handlers
        this.loadHandlers(
            this,
            [Handlers.InteractionCommand, Handlers.Event]
        );

        // Log in to Discord with the specified token
        console.log('qwerty');
        this.login(process.env.DISCORD_BOT_TOKEN);
    }

    // Stop the bot
    stop() {
        // Destroy the client to stop all active connections and clear all timers and intervals
        this.destroy();
    }

    // Load the command categories from the filesystem
    private loadCommandCategories() {
        // Get a list of subdirectories in the commands directory
        const categoryFiles = readdirSync(resolve('./build/commands/interaction'), { withFileTypes: true })
            .filter((dirent) => dirent.isDirectory())
            .map((dirent) => dirent.name);

        // Add the category names to the categories array
        this.categories.push(...categoryFiles);
    }

    private async loadHandlers(client: BotClient, handlers: string[]) {

        handlers.forEach((handler) => {
            console.log(`Loading handler ${handler}`);
            const handlerPath: string = join(__dirname, `../handlers/${handler}`);
            this.importHandler(handlerPath).then((importedHandler: BotHandler) => {
                if (importedHandler.intervalEnabled) {
                    runAtMultipleSpecificTimes(() => {
                        importedHandler.execute(client);
                    }, importedHandler.interval);
                }
                else {
                    importedHandler.execute(client);
                }
            });
        });
    }

    private async importHandler(filePath: string) {
        const handlerModule = await import(filePath);
        return handlerModule.default;
    }
}

export default BotClient;