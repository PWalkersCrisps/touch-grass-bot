import fs from 'fs';
import path from 'path';
import { EmbedBuilder } from 'discord.js';
import config from '../data/config.json';

export = {
    toServer: function(client: any, member: any, reason: string, guildData: any) {
        const logEmbed: EmbedBuilder = new EmbedBuilder()
            .setTitle('Verification')
            .setDescription(`**User:** ${member.user.tag}\n**Reason:** ${reason}`);
        if (guildData.logChannelID) client.channels.cache.get(guildData.logChannelID).send({ embeds: [logEmbed] });
        if (config.logChannelID) client.channels.cache.get(config.logChannelID).send({ embeds: [logEmbed] });
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