/* eslint-disable @typescript-eslint/no-var-requires */
import fs from 'fs';
import ascii from 'ascii-table';
import path from 'path';

const table = new ascii('Commands');

table.setHeading('Command', ' Load status');

module.exports = (client: any) => {
    fs.readdirSync('./build/commands').forEach((dir) => {
        const commands: string[] = fs.readdirSync(`./build/commands/${dir}/`).filter((file) => file.endsWith('.js'));
        for (const file of commands) {
            const pull: any = require(path.resolve(`./build/commands/${dir}/${file}`));
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
    console.log(table.toString());
};