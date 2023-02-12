import fs from 'fs';
import path from 'path';
import { Client, EmbedBuilder } from 'discord.js';
import config from '../data/config.json';
import { GuildDocument } from '../declarations';

export = {
    toServer: function(client: any, guildData: GuildDocument, logEmbed: EmbedBuilder, logType: string) {
        try {
            if (guildData.nsfwBanLogChannelID && logType === 'nsfwban') client.channels.cache.get(guildData.nsfwBanLogChannelID).send({ embeds: [logEmbed] });
            if (guildData.verificationLogChannelID && logType === 'verify') client.channels.cache.get(guildData.verificationLogChannelID).send({ embeds: [logEmbed] });
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