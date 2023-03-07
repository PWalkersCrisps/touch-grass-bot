import profileSchema = require('../schemas/profileSchema');
import guildSchema = require('../schemas/guildSchema');
import { Events, Interaction } from 'discord.js';
import { TouchGrassClient } from '../structures/client';

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction: Interaction) {
        try {
            const client: TouchGrassClient = interaction.client as TouchGrassClient;
            const profileData: ProfileDocument = await profileSchema.findOneAndUpdate({ userID: interaction.user.id }, { userID: interaction.user.id }, { upsert: true, new: true }); // Get the profile data from the database
            let guildData: GuildDocument | undefined = undefined;
            if (interaction.guild?.available) guildData = await guildSchema.findOneAndUpdate({ guildID: interaction.guild.id }, { guildID: interaction.guild.id }, { upsert: true, new: true }); // Get the guild data from the database
            if (interaction.isCommand()) {
                const command: any = client.commands.get(interaction.commandName); // Get the command from the client's commands collection

                if (!interaction.guild?.available) return;
                if (!interaction.inCachedGuild()) return;
                if (!interaction.isChatInputCommand()) return;

                if (!command) return; // If the command is not found, return


                try {
                    await command.execute({ client, interaction, profileData, guildData }); // Execute the command
                }
                catch (error) {
                    console.error(error); // If there is an error, log it
                    await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
                }
            }
            else if (interaction.isButton()) {
                // get button file by the button id
                const button = client.buttons.get(interaction.customId);
                if (!button) return;

                try {
                    await button.execute({ client, interaction, profileData, guildData });
                }
                catch (error) {
                    console.error(error);
                    await interaction.reply({ content: 'There was an error while executing this button!', ephemeral: true });
                }
            }
        }
        catch (error) {
            console.error(error);
        }
    },
};