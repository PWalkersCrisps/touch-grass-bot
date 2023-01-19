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
    name: 'verify',
    description: 'Verify a user',
    execute({ client, interaction, profileData, guildData }) {
        return __awaiter(this, void 0, void 0, function* () {
            const member = interaction.options.getMember('user');
            const reason = interaction.options.getString('reason');
            if (!member.roles.cache.some((role) => guildData.moderationRoleIDs.includes(role.id)))
                return interaction.reply({ content: 'You do not have the required permissions', ephemeral: true });
            if (!member)
                return interaction.reply({ content: 'Please specify a user to verify', ephemeral: true });
            const embed = new discord_js_1.EmbedBuilder()
                .setTitle('Verification')
                .setDescription(`**User:** ${member.user.tag}\n**Reason:** ${reason}`);
            const logEmbed = new discord_js_1.EmbedBuilder()
                .setTitle('Verification')
                .setDescription(`**User:** ${member.user.tag}\n**Reason:** ${reason}`);
            try {
                if (guildData.unverifiedRoleID)
                    member.roles.remove(guildData.unverifiedRoleID);
                if (guildData.verifiedRoleID)
                    member.roles.add(guildData.verifiedRoleID);
                if (guildData.logChannelID)
                    client.channels.cache.get(guildData.logChannelID).send({ embeds: [logEmbed] });
                profileData.verified = true;
                profileData.save();
                interaction.reply({ embeds: [embed] });
            }
            catch (error) {
                console.error(error);
                return interaction.reply({ content: 'There was an error verifying the user', ephemeral: true });
            }
        });
    },
};
