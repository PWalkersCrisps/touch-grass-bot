"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
module.exports = [
    new discord_js_1.SlashCommandBuilder()
        .setName('verify')
        .setDescription('Verify a user')
        .addUserOption(option => option.setName('user')
        .setDescription('The user to verify')
        .setRequired(true))
        .addStringOption(option => option.setName('reason')
        .setDescription('The reason for verification')),
    new discord_js_1.SlashCommandBuilder()
        .setName('unverify')
        .setDescription('Unverify a user incase of a mistake')
        .addUserOption(option => option.setName('user')
        .setDescription('The user to unverify')
        .setRequired(true))
        .addStringOption(option => option.setName('reason')
        .setDescription('The reason for unverification')),
    new discord_js_1.SlashCommandBuilder()
        .setName('check')
        .setDescription('Get the ID of a user')
        .addUserOption(option => option.setName('user')
        .setDescription('The user to get the ID of')
        .setRequired(true))
        .addStringOption(option => option.setName('reason')
        .setDescription('The reason for identification')),
    new discord_js_1.SlashCommandBuilder()
        .setName('ban')
        .setDescription('Ban a user from using verification locked channels')
        .addUserOption(option => option.setName('user')
        .setDescription('The user to ban')
        .setRequired(true))
        .addStringOption(option => option.setName('reason')
        .setDescription('The reason for banning')),
    new discord_js_1.SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with server latinency'),
    new discord_js_1.SlashCommandBuilder()
        .setName('help')
        .setDescription('Helps you with shit you didnt know'),
    new discord_js_1.SlashCommandBuilder()
        .setName('echo')
        .setDescription('Echo your message')
        .setDefaultMemberPermissions(discord_js_1.PermissionFlagsBits.Administrator)
        .setDMPermission(false)
        .addStringOption(option => option
        .setName('input')
        .setDescription('Enter a string')
        .setRequired(true)),
    new discord_js_1.SlashCommandBuilder()
        .setName('uptime')
        .setDescription('Check how long has the bot been online.'),
    new discord_js_1.SlashCommandBuilder()
        .setName('invite')
        .setDescription('Invite the bot to your server'),
    new discord_js_1.SlashCommandBuilder()
        .setName('trust')
        .setDescription('Trust a server and its moderation team'),
];
