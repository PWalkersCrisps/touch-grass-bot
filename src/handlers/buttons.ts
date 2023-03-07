/* eslint-disable @typescript-eslint/no-var-requires */
import { readdirSync } from 'fs';
import ascii from 'ascii-table';
import { resolve } from 'path';
import { TouchGrassClient } from '../structures/client';
import log from '../modules/log';

const table = new ascii('Buttons');

table.setHeading('Button', ' Load status');

module.exports = (client: TouchGrassClient) => {
    const buttons: string[] = readdirSync('./build/commands/buttons/').filter((file) => file.endsWith('.js'));
    for (const file of buttons) {
        const pull: File = require(resolve(`./build/commands/buttons/${file}`));
        if (pull.name) {
            client.buttons.set(pull.name, pull);
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
    log(table.toString());
};