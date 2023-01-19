import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';

module.exports = [

    new SlashCommandBuilder()
        .setName('botinfo')
        .setDescription('Shows info about the bot.'),

    new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with server latinency'),

    new SlashCommandBuilder()
        .setName('help')
        .setDescription('Helps you with shit you didnt know'),

    new SlashCommandBuilder()
        .setName('uptime')
        .setDescription('Check how long has the bot been online.'),

    new SlashCommandBuilder()
        .setName('stickyroles')
        .setDescription('Toggles sticky roles.'),

    new SlashCommandBuilder()
        .setName('serverinfo')
        .setDescription('Shows info about the server.'),
];