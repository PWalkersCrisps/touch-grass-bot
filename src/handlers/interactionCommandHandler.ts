import BotClient from '../classes/client';
import BotHandler, { Handlers } from '../classes/handler';
import { InteractionCommand } from '../classes/command';
import fs from 'fs';
import path from 'path';

export class InteractionCommandHandler extends BotHandler {

    constructor() {
        super();
        this.name = Handlers.InteractionCommand;
    }

    async execute(client: BotClient): Promise<void> {
        fs.readdirSync('./build/commands/interaction').forEach(async (dir) => {
            const commands: string[] = fs.readdirSync(`./build/commands/interaction/${dir}/`).filter((file) => file.endsWith('.js'));
            await this.loadCommands(client, dir, commands);
        });
    }

    private async loadCommands(client: BotClient, dir: string, commands: string[]) {

        const commandPathLog: string[] = [];

        for (const file of commands) {
            const commandPath = path.resolve(`./build/commands/interaction/${dir}/${file}`);

            commandPathLog.push(commandPath);

            const pull: InteractionCommand = await this.importCommand(commandPath);

            if (!pull.name) {
                console.log(`Skipped loading interaction command from ${commandPath}`);
                continue;
            }

            console.log(`Loaded interaction command ${pull.name}`);
            client.interactionCommands.set(pull.name, pull);
            client.data.push(pull.data.toJSON());
        }
    }

    private async importCommand(filePath: string) {
        const commandModule = await import(filePath);
        return commandModule.default;
    }
}

export default new InteractionCommandHandler();