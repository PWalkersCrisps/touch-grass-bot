/* eslint-disable @typescript-eslint/no-var-requires */
import { clientID, testingGuildID } from '../data/config.json';
import { REST, Routes } from 'discord.js';

import commands = require('../data/interactionCommands');
import time from '../modules/time';
import { config } from 'dotenv';
config();

import roleSync = require('../modules/roleSync');

module.exports = {
    name: 'ready',
    once: true,
    async execute(client: any) {
        try {
            const readyMessage = `${ time.currentDate } ${ client.user.tag } is online, hopefully it works`;

            console.log(readyMessage);

            const rest = new REST({
                version: '9',
            }).setToken(process.env.BOT_TOKEN as string);

            console.log(`${ time.currentDate } Started refreshing application (/) commands.`);

            await rest.put(
                Routes.applicationGuildCommands(clientID, testingGuildID),
                { body: commands },
            );

            console.log(`${ time.currentDate } Successfully reloaded application (/) commands.`);

            roleSync.sync(client);
        }
        catch (error) {
            console.error(`${time.currentDate} ready error: ${error}`);
        }
    },
};