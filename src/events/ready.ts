/* eslint-disable @typescript-eslint/no-var-requires */
import { REST, Routes } from 'discord.js';
import { TouchGrassClient } from '../classes/client';

import commands from '../data/interactionCommands';
import { currentDate } from '../modules/time';
import { config } from 'dotenv';
config();

import roleSync from '../modules/roleSync';
import imageOnly from '../modules/imageOnly';

import log from '../modules/log';

module.exports = {
    name: 'ready',
    once: true,
    async execute(client: TouchGrassClient) {
        try {
            const readyMessage = `${ currentDate } ${ client.user?.tag } is online, hopefully it works`;

            log(readyMessage);

            try {
                deployCommands(client.user?.id);
                // roleSync(client);
                imageOnly(client);
            }
            catch (error) {
                log(error, 'error');
            }

        }
        catch (error) {
            log(`${currentDate} ready error: ${error}`, 'error');
        }
    },
};

async function deployCommands(clientID: string | undefined) {
    if (!clientID) return console.error('No client ID found');
    const rest = new REST({ version: '9' }).setToken((process.env.NODE_ENV === 'production' ? process.env.BOT_TOKEN : process.env.DEV_BOT_TOKEN) as string);

    log(`${ currentDate } Started refreshing application (/) commands.`);

    await rest.put(
        Routes.applicationCommands(clientID),
        { body: commands },
    );

    log(`${ currentDate } Successfully reloaded application (/) commands.`);
}