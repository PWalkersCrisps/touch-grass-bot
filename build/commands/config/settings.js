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
/* eslint-disable no-case-declarations */
const discord_js_1 = require("discord.js");
module.exports = {
    name: 'settings',
    description: 'View and change the server settings',
    execute({ client, interaction, guildData }) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const verifiedRoleID = guildData.verifiedRoleID ? `<@&${guildData.verifiedRoleID}>` : 'None';
            const unverifiedRoleID = guildData.unverifiedRoleID ? `<@&${guildData.unverifiedRoleID}>` : 'None';
            const nsfwRoleID = guildData.nsfwRoleID ? `<@&${guildData.nsfwRoleID}>` : 'None';
            const moderationRoleIDs = guildData.moderationRoleIDs ? guildData.moderationRoleIDs.map((role) => `<@&${role}>`) : 'None';
            const verificationChannelID = guildData.verificationChannelID ? `<#${guildData.verificationChannelID}>` : 'None';
            const viewSettingsEmbed = new discord_js_1.EmbedBuilder()
                .setTitle('Settings')
                .setDescription(`**Verified Role:** ${verifiedRoleID}\n**Unverified Role:** ${unverifiedRoleID}\n**NSFW Role:** ${nsfwRoleID}\n**Moderation Roles:** ${moderationRoleIDs}\n**Verification Channel:** ${verificationChannelID}`);
            switch (interaction.options.getSubcommand()) {
                case 'view':
                    return interaction.reply({ embeds: [viewSettingsEmbed] });
                case 'set':
                    const setting = interaction.options.getString('setting');
                    const value = ((_a = interaction.options.getRole('role')) === null || _a === void 0 ? void 0 : _a.id) || ((_b = interaction.options.getChannel('channel')) === null || _b === void 0 ? void 0 : _b.id);
                    switch (setting) {
                        case 'verified-role':
                            guildData.verifiedRoleID = value;
                            break;
                        case 'unverified-role':
                            guildData.unverifiedRoleID = value;
                            break;
                        case 'nsfw-role':
                            guildData.nsfwRoleID = value;
                            break;
                        case 'add-moderation-role':
                            guildData.moderationRoleIDs.push(value);
                            break;
                        case 'remove-moderation-role':
                            guildData.moderationRoleIDs = guildData.moderationRoleIDs.filter((role) => role !== value);
                            break;
                        case 'reset-moderation-roles':
                            guildData.moderationRoleIDs = [];
                            break;
                        case 'verification-channel':
                            guildData.verificationChannelID = value;
                            break;
                    }
                    yield guildData.save();
                    return interaction.reply({ embeds: [viewSettingsEmbed] });
            }
        });
    },
};
