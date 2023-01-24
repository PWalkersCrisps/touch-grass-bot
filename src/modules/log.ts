import fs from 'fs';
import path from 'path';
import { EmbedBuilder } from 'discord.js';
import config from '../data/config.json';

export = {
    toServer: function(client: any, guildData: any, logEmbed: any) {
        try {
            if (guildData.logChannelID) client.channels.cache.get(guildData.logChannelID).send({ embeds: [logEmbed] });
            if (config.logChannelID) client.channels.cache.get(config.logChannelID).send({ embeds: [logEmbed] });
        }
        catch (error) {
            console.error(error);
        }
    },
    console: function(input: string) {
        console.log(input);
        // write to log file
        const logFile = path.join(__dirname, `../../logs/${new Date().toDateString()}.log`);
        fs.appendFile(logFile, `${new Date().toLocaleString()} - ${input}\n`, (error) => {
            if (error) console.error(error);
        });
    },
};