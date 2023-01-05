import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';

module.exports = [
    new SlashCommandBuilder()
        .setName('verify')
        .setDescription('Verify a user')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('The user to verify')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('reason')
                .setDescription('The reason for verification')),

    new SlashCommandBuilder()
        .setName('unverify')
        .setDescription('Unverify a user incase of a mistake')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('The user to unverify')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('reason')
                .setDescription('The reason for unverification')),

    new SlashCommandBuilder()
        .setName('check')
        .setDescription('Get the ID of a user')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('The user to get the ID of')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('reason')
                .setDescription('The reason for identification')),

    new SlashCommandBuilder()
        .setName('ban')
        .setDescription('Ban a user from using verification locked channels')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('The user to ban')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('reason')
                .setDescription('The reason for banning')),

    new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with server latinency'),

    new SlashCommandBuilder()
        .setName('help')
        .setDescription('Helps you with shit you didnt know'),

    new SlashCommandBuilder()
        .setName('echo')
        .setDescription('Echo your message')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .setDMPermission(false)
        .addStringOption(option =>
            option
                .setName('input')
                .setDescription('Enter a string')
                .setRequired(true)),

    new SlashCommandBuilder()
        .setName('uptime')
        .setDescription('Check how long has the bot been online.'),

    new SlashCommandBuilder()
        .setName('invite')
        .setDescription('Invite the bot to your server'),

    new SlashCommandBuilder()
        .setName('trust')
        .setDescription('Trust a server and its moderation team'),
];