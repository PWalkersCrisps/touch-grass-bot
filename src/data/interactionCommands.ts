import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';

module.exports = [

    new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with server latinency'),

    new SlashCommandBuilder()
        .setName('help')
        .setDescription('Helps you with shit you didnt know'),

    new SlashCommandBuilder()
        .setName('uptime')
        .setDescription('Check how long has the bot been online.'),
];