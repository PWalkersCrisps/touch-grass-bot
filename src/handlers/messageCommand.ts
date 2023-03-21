/* eslint-disable @typescript-eslint/no-var-requires */
import { readdirSync } from 'fs';
import ascii from 'ascii-table';
import { resolve } from 'path';
import { TouchGrassClient } from '../classes/client';
import log from '../modules/log';

const table = new ascii('Message commands');

table.setHeading('Message command', ' Load status');

module.exports = (client: TouchGrassClient) => {
    readdirSync('./build/commands/message').forEach((dir) => {
        const messageCommands: string[] = readdirSync(`./build/commands/message/${dir}/`).filter((file) => file.endsWith('.js'));
        for (const file of messageCommands) {
            const pull: File = require(resolve(`./build/commands/message/${dir}/${file}`));
            if (pull.name) {
                client.messageCommands.set(pull.name, pull);
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