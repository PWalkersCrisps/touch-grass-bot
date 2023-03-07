import fs from 'fs';
import path from 'path';
import { EmbedBuilder } from 'discord.js';
import config from '../data/config.json';

export function toServer(client: any, guildData: GuildDocument, logEmbed: EmbedBuilder, logType: ServerLogType) {
    try {
        if (guildData.nsfwBanLogChannelID && logType === 'nsfwban') client.channels.cache.get(guildData.nsfwBanLogChannelID).send({ embeds: [logEmbed] });
        if (guildData.verificationLogChannelID && logType === 'verify') client.channels.cache.get(guildData.verificationLogChannelID).send({ embeds: [logEmbed] });
        const logChannel = client.channels.cache.get(config.logChannelID);
        if (config.logChannelID && logChannel) logChannel.send({ embeds: [logEmbed] });
    }
    catch (error) {
        console.error(error);
    }
}
export default function log(input: string, logType: ConsoleLogType = 'log') {
    // write to console
    switch (logType) {
        case 'log':
            console.log(input);
            break;
        case 'warn':
            console.warn(input);
            break;
        case 'error':
            console.error(input);
            break;
        case 'debug':
            if (config.debug) console.log(input);
            break;
    }

    // write to log file create folder or file (with date as prefix) if it doenst exist
    if (!fs.existsSync(path.join(__dirname, '../../logs'))) fs.mkdirSync(path.join(__dirname, '../../logs'));
    if (!fs.existsSync(path.join(__dirname, `../../logs/${new Date().toDateString()}.log`))) fs.writeFileSync(path.join(__dirname, `../../logs/${new Date().toDateString()}.log`), '');

    // write to file
    fs.appendFileSync(path.join(__dirname, `../../logs/${new Date().toDateString()}.log`), `${!(logType == 'log') ? logType.toUpperCase() + ': ' : ''}${input}\n`);
}