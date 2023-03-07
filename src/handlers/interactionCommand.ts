/* eslint-disable @typescript-eslint/no-var-requires */
import { readdirSync } from 'fs';
import ascii from 'ascii-table';
import { resolve } from 'path';
import { TouchGrassClient } from '../structures/client';
import log from '../modules/log';

const table = new ascii('Commands');

table.setHeading('Command', ' Load status');

module.exports = (client: TouchGrassClient) => {
    readdirSync('./build/commands/interaction').forEach((dir) => {
        const commands: string[] = readdirSync(`./build/commands/interaction/${dir}/`).filter((file) => file.endsWith('.js'));
        for (const file of commands) {
            const pull: any = require(resolve(`./build/commands/interaction/${dir}/${file}`));
            if (pull.name) {
                client.commands.set(pull.name, pull);
                table.addRow(file, '✅');
            }
            else {
                table.addRow(
                    file,
                    '❌ -> missing a name, or name is not a string.',
                );
                continue;
            }
        }
    });
    log(table.toString());
};