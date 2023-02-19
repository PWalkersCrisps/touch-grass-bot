import { SlashCommandBuilder, PermissionFlagsBits, SlashCommandSubcommandBuilder } from 'discord.js';

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

    new SlashCommandBuilder()
        .setName('trust')
        .setDescription('Trusts a user or guild.')
        .addSubcommand(subcommand =>
            subcommand
                .setName('guild')
                .setDescription('Trusts a guild.'))
        .addSubcommand(subcommand =>
            subcommand
                .setName('user')
                .setDescription('Trusts a user.')
                .addUserOption(option =>
                    option
                        .setName('user')
                        .setDescription('The user to trust.')
                        .setRequired(true))),

    new SlashCommandBuilder()
        .setName('whois')
        .setDescription('Shows info about a user.')
        .addUserOption(option =>
            option
                .setName('user')
                .setDescription('The user to get info about.')),

    new SlashCommandBuilder()
        .setName('verify')
        .setDescription('Verifies a user.')
        .addUserOption(option =>
            option
                .setName('user')
                .setDescription('The user to verify.')
                .setRequired(true))
        .addStringOption(option =>
            option
                .setName('reason')
                .setDescription('The reason for verification.'))
        .addBooleanOption(option =>
            option
                .setName('hide')
                .setDescription('Hide the ban from the general chat.')),

    new SlashCommandBuilder()
        .setName('about')
        .setDescription('Shows info about the bot.'),

    new SlashCommandBuilder()
        .setName('nsfwban')
        .setDescription('Bans a user from viewing NSFW channels.')
        .addUserOption(option =>
            option
                .setName('user')
                .setDescription('The user to ban.')
                .setRequired(true))
        .addStringOption(option =>
            option
                .setName('reason')
                .setDescription('The reason for the ban.'))
        .addBooleanOption(option =>
            option
                .setName('id')
                .setDescription('ID Check'))
        .addBooleanOption(option =>
            option
                .setName('hide')
                .setDescription('Hide the ban from the general chat.')),

    new SlashCommandBuilder()
        .setName('modstats')
        .setDescription('Shows moderation stats for a user.')
        .addUserOption(option =>
            option
                .setName('user')
                .setDescription('The user to get stats for.')),

    new SlashCommandBuilder()
        .setName('manualcheck')
        .setDescription('Manually checks a user.')
        .addUserOption(option =>
            option
                .setName('user')
                .setDescription('The user to check.')),

    new SlashCommandBuilder()
        .setName('guildstats')
        .setDescription('Shows moderation stats for a guild.'),

    new SlashCommandBuilder()
        .setName('serverroles')
        .setDescription('Sets the roles for the server.')
        .addSubcommand(subcommand =>
            subcommand
                .setName('nsfwbanrole')
                .setDescription('Sets the NSFW ban role.')
                .addRoleOption(option =>
                    option
                        .setName('role')
                        .setDescription('The role to set.')
                        .setRequired(true))
                .addStringOption(option =>
                    option
                        .setName('addremove')
                        .setDescription('Whether to add or remove a role.')
                        .addChoices(
                            { name: 'add', value: 'add' },
                            { name: 'remove', value: 'remove' }
                        )
                        .setRequired(true)))
        .addSubcommand(subcommand =>
            subcommand
                .setName('nsfwrole')
                .setDescription('Sets the NSFW role.')
                .addRoleOption(option =>
                    option
                        .setName('role')
                        .setDescription('The role to set.')
                        .setRequired(true))
                .addStringOption(option =>
                    option
                        .setName('addremove')
                        .setDescription('Whether to add or remove a role.')
                        .addChoices(
                            { name: 'add', value: 'add' },
                            { name: 'remove', value: 'remove' }
                        )
                        .setRequired(true)))
        .addSubcommand(subcommand =>
            subcommand
                .setName('verifiedrole')
                .setDescription('Sets the verified role.')
                .addRoleOption(option =>
                    option
                        .setName('role')
                        .setDescription('The role to set.')
                        .setRequired(true))
                .addStringOption(option =>
                    option
                        .setName('addremove')
                        .setDescription('Whether to add or remove a role.')
                        .addChoices(
                            { name: 'add', value: 'add' },
                            { name: 'remove', value: 'remove' }
                        )
                        .setRequired(true)))
        .addSubcommand(subcommand =>
            subcommand
                .setName('modroles')
                .setDescription('Sets the mod roles.')
                .addRoleOption(option =>
                    option
                        .setName('role')
                        .setDescription('The role to set.')
                        .setRequired(true))
                .addStringOption(option =>
                    option
                        .setName('addremove')
                        .setDescription('Whether to add or remove a role.')
                        .addChoices(
                            { name: 'add', value: 'add' },
                            { name: 'remove', value: 'remove' }
                        )
                        .setRequired(true)))
        .addSubcommand(subcommand =>
            subcommand
                .setName('showroles')
                .setDescription('Shows the roles for the server.')),

    new SlashCommandBuilder()
        .setName('imageonly')
        .setDescription('Toggles image only mode.')
        .addSubcommand(subcommand =>
            subcommand
                .setName('add')
                .setDescription('Adds a channel to image only mode.')
                .addChannelOption(option =>
                    option
                        .setName('channel')
                        .setDescription('The channel to add.')
                        .setRequired(true)))
        .addSubcommand(subcommand =>
            subcommand
                .setName('remove')
                .setDescription('Removes a channel from image only mode.')
                .addChannelOption(option =>
                    option
                        .setName('channel')
                        .setDescription('The channel to remove.')
                        .setRequired(true)))
        .addSubcommand(subcommand =>
            subcommand
                .setName('list')
                .setDescription('Lists the channels in image only mode.')),

    new SlashCommandBuilder()
        .setName('rolesync')
        .setDescription('Toggles role sync.')
        .addSubcommand(subcommand =>
            subcommand
                .setName('import')
                .setDescription('Imports roles from the server.')
                .addStringOption(option =>
                    option
                        .setName('choice')
                        .setDescription('Whether to turn on role importing from db.')
                        .addChoices(
                            { name: 'on', value: 'on' },
                            { name: 'off', value: 'off' }
                        )
                        .setRequired(true)))
        .addSubcommand(subcommand =>
            subcommand
                .setName('export')
                .setDescription('Exports roles to the server.')
                .addStringOption(option =>
                    option
                        .setName('choice')
                        .setDescription('Whether to turn on role exporting to db.')
                        .addChoices(
                            { name: 'on', value: 'on' },
                            { name: 'off', value: 'off' }
                        )
                        .setRequired(true))),

    new SlashCommandBuilder()
        .setName('logchannel')
        .setDescription('Sets the log channel.')
        .addChannelOption(option =>
            option
                .setName('channel')
                .setDescription('The channel to set.')
                .setRequired(true))
        .addStringOption(option =>
            option
                .setName('type')
                .setDescription('The type of log channel.')
                .addChoices(
                    { name: 'NSFW Ban', value: 'nsfwban' },
                    { name: 'Verification', value: 'verify' },
                )
                .setRequired(true)),

    new SlashCommandBuilder()
        .setName('unverify')
        .setDescription('Unverifies a user.')
        .addUserOption(option =>
            option
                .setName('user')
                .setDescription('The user to unverify.')
                .setRequired(true)),

    new SlashCommandBuilder()
        .setName('unnsfwban')
        .setDescription('Unnsfwbans a user.')
        .addUserOption(option =>
            option
                .setName('user')
                .setDescription('The user to unnsfwbans.')
                .setRequired(true)),
];