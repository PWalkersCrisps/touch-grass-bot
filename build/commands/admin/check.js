"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
module.exports = {
    name: 'check',
    description: 'Do an identification check on a user',
    execute({ client, interaction, profileData, guildData }) {
        return __awaiter(this, void 0, void 0, function* () {
            const member = interaction.options.getMember('user');
            const reason = interaction.options.getString('reason');
            if (!member.roles.cache.some((role) => guildData.moderationRoleIDs.includes(role.id)))
                return interaction.reply({ content: 'You do not have the required permissions', ephemeral: true });
            if (!member)
                return interaction.reply({ content: 'Please specify a user to identify', ephemeral: true });
            if (member.id === interaction.user.id)
                return interaction.reply({ content: 'You can\'t identify yourself!', ephemeral: true });
            if (member.id === client.user.id)
                return interaction.reply({ content: 'You can\'t identify me!', ephemeral: true });
            const embed = new discord_js_1.EmbedBuilder()
                .setTitle('Identification Check')
                .setDescription(`**User:** ${member.user.tag}\n**Reason:** ${reason}`)
                .addFields({ name: '**To verify:**', value: 'Please DM (Direct Message) your ID or any official document that has your birthdate on it to a staff member\nCensor/blur out everything apart from the birthdate and make sure to send 2 pics from 2 different angles.' }, { name: '**Role changes:**', value: `${member.roles.cache.some((role) => role.id === guildData.nsfwRoleID) ? `Removed <@&${guildData.nsfwRoleID}>` : 'No changes to roles made'}\n${member.roles.cache.some((role) => role.id === guildData.unverifiedRoleID) ? `Removed <@&${guildData.unverifiedRoleID}>` : 'No changes to roles made'}` });
            const logEmbed = new discord_js_1.EmbedBuilder()
                .setTitle('Identification Check')
                .setDescription(`**User:** ${member.user.tag}\n**Reason:** ${reason}`);
            try {
                if (guildData.nsfwRoleID)
                    member.roles.remove(guildData.nsfwRoleID);
                if (guildData.unverifiedRoleID)
                    member.roles.add(guildData.unverifiedRoleID);
                if (guildData.logChannelID)
                    client.channels.cache.get(guildData.logChannelID).send({ embeds: [logEmbed] });
                profileData.verified = false;
                profileData.save();
                interaction.reply({ embeds: [embed] });
            }
            catch (error) {
                console.error(error);
                return interaction.reply({ content: 'There was an error identifying the user', ephemeral: true });
            }
        });
    },
};
