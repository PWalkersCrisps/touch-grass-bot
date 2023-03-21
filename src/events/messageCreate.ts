import profileSchema = require('../schemas/profileSchema');
import guildSchema = require('../schemas/guildSchema');
import { Events, Message } from 'discord.js';
import { TouchGrassClient } from '../classes/client';
module.exports = {
    name: Events.MessageCreate,
    async execute(message: Message) {
        const client: TouchGrassClient = message.client as TouchGrassClient;
        try {
            if (!message.guild?.available) return;

            const profileData: ProfileDocument = await profileSchema.findOneAndUpdate({ userID: message.author.id }, { userID: message.author.id }, { upsert: true, new: true }); // Get the profile data from the database
            const guildData: GuildDocument = await guildSchema.findOneAndUpdate({ guildID: message.guild.id }, { guildID: message.guild.id }, { upsert: true, new: true }); // Get the guild data from the database

            if (!message.content.startsWith(guildData.prefix)) return;
            else if (!message.content.startsWith('!')) return;

            const args = message.content.slice(1).trim().split(/ +/);
            const commandName = args.shift()?.toLowerCase();
            const command = client.messageCommands.get(commandName) || client.messageCommands.find((cmd: any) => cmd.aliases && cmd.aliases.includes(commandName));

            if (!command) return;

            try {
                await command.execute({ client, message, args, profileData, guildData });
            }
            catch (error) {
                console.error(error);
                await message.reply({ content: 'There was an error while executing this command!' });
            }
        }
        catch (error) {
            console.error(error);
        }
    },
};