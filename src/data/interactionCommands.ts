import { SlashCommandBuilder } from 'discord.js';

const funCommands = [
    new SlashCommandBuilder()
        .setName('cat')
        .setDescription('Shows a random cat image.'),

    new SlashCommandBuilder()
        .setName('dice')
        .setDescription('Rolls a 6 sided die.'),

    new SlashCommandBuilder()
        .setName('dog')
        .setDescription('Shows a random dog image.'),

    new SlashCommandBuilder()
        .setName('flip')
        .setDescription('Flips a coin.'),

    new SlashCommandBuilder()
        .setName('poll')
        .setDescription('Creates a poll.')
        .addStringOption(option =>
            option
                .setName('question')
                .setDescription('The question to ask.')
                .setRequired(true))
        .addStringOption(option =>
            option
                .setName('option1')
                .setDescription('The first option.')
                .setRequired(true))
        .addStringOption(option =>
            option
                .setName('option2')
                .setDescription('The second option.')
                .setRequired(true))
        .addStringOption(option =>
            option
                .setName('option3')
                .setDescription('The third option.'))
        .addStringOption(option =>
            option
                .setName('option4')
                .setDescription('The fourth option.'))
        .addStringOption(option =>
            option
                .setName('option5')
                .setDescription('The fifth option.'))
        .addStringOption(option =>
            option
                .setName('option6')
                .setDescription('The sixth option.'))
        .addStringOption(option =>
            option
                .setName('option7')
                .setDescription('The seventh option.'))
        .addStringOption(option =>
            option
                .setName('option8')
                .setDescription('The eighth option.'))
        .addStringOption(option =>
            option
                .setName('option9')
                .setDescription('The ninth option.'))
        .addStringOption(option =>
            option
                .setName('option10')
                .setDescription('The tenth option.')),

    new SlashCommandBuilder()
        .setName('rps')
        .setDescription('Play rock paper scissors.')
        .addStringOption(option =>
            option
                .setName('choice')
                .setDescription('The choice you want to make.')
                .addChoices(
                    { name: 'Rock', value: 'rock' },
                    { name: 'Paper', value: 'paper' },
                    { name: 'Scissors', value: 'scissors' })
        ),

    new SlashCommandBuilder()
        .setName('sex')
        .setDescription('Have sex with someone else')
        .addUserOption(option =>
            option
                .setName('target')
                .setDescription('The member you want to have sex with')
        ),
];

const infoCommands = [
    new SlashCommandBuilder()
        .setName('about')
        .setDescription('Shows info about the bot.'),

    new SlashCommandBuilder()
        .setName('help')
        .setDescription('Helps you with shit you didnt know'),

    new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with server latinency'),

    new SlashCommandBuilder()
        .setName('serverinfo')
        .setDescription('Shows info about the server.'),

    new SlashCommandBuilder()
        .setName('uptime')
        .setDescription('Check how long has the bot been online.'),

    new SlashCommandBuilder()
        .setName('whois')
        .setDescription('Shows info about a member.')
        .addUserOption(option =>
            option
                .setName('member')
                .setDescription('The member to get info about.')),
];

const miscCommands = [
    new SlashCommandBuilder()
        .setName('avatar')
        .setDescription('Shows the avatar of a member.')
        .addUserOption(option =>
            option
                .setName('member')
                .setDescription('The member to get the avatar of.')),
];

const moderationCommands = [
    new SlashCommandBuilder()
        .setName('ban')
        .setDescription('Bans a member.')
        .addUserOption(option =>
            option
                .setName('member')
                .setDescription('The member to ban.')
                .setRequired(true))
        .addStringOption(option =>
            option
                .setName('reason')
                .setDescription('The reason for the ban.')
                .setRequired(false))
        .addBooleanOption(option =>
            option
                .setName('delete-messages')
                .setDescription('Whether to delete messages from the member.')
                .setRequired(false))
        .addIntegerOption(option =>
            option
                .setName('days')
                .setDescription('The number of days to delete messages for.')
                .setRequired(false))
        .addIntegerOption(option =>
            option
                .setName('hours')
                .setDescription('The number of hours to delete messages for.')
                .setRequired(false))
        .addIntegerOption(option =>
            option
                .setName('minutes')
                .setDescription('The number of minutes to delete messages for.')
                .setRequired(false)),

    new SlashCommandBuilder()
        .setName('kick')
        .setDescription('Kicks a member.')
        .addUserOption(option =>
            option
                .setName('member')
                .setDescription('The member to kick.')
                .setRequired(true))
        .addStringOption(option =>
            option
                .setName('reason')
                .setDescription('The reason for the kick.')
                .setRequired(false)),

    new SlashCommandBuilder()
        .setName('mute')
        .setDescription('Mutes a member.')
        .addUserOption(option =>
            option
                .setName('member')
                .setDescription('The member to mute.')
                .setRequired(true))
        .addStringOption(option =>
            option
                .setName('reason')
                .setDescription('The reason for the mute.')
                .setRequired(false))
        .addIntegerOption(option =>
            option
                .setName('days')
                .setDescription('The number of days to delete messages for.')
                .setRequired(false))
        .addIntegerOption(option =>
            option
                .setName('hours')
                .setDescription('The number of hours to delete messages for.')
                .setRequired(false))
        .addIntegerOption(option =>
            option
                .setName('minutes')
                .setDescription('The number of minutes to delete messages for.')
                .setRequired(false)),

    new SlashCommandBuilder()
        .setName('unban')
        .setDescription('Unbans a member.')
        .addStringOption(option =>
            option
                .setName('member-id')
                .setDescription('The ID of the member to unban.')
                .setRequired(true)),

    new SlashCommandBuilder()
        .setName('unmute')
        .setDescription('Unmutes a member.')
        .addUserOption(option =>
            option
                .setName('member')
                .setDescription('The member to unmute.')
                .setRequired(true)),
];

const settingsCommands = [
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
        .setName('stickyroles')
        .setDescription('Toggles sticky roles.'),

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
];

const statisticsCommands = [
    new SlashCommandBuilder()
        .setName('guildstats')
        .setDescription('Shows guild stats.'),

    new SlashCommandBuilder()
        .setName('modstats')
        .setDescription('Shows moderation stats for a member.')
        .addUserOption(option =>
            option
                .setName('member')
                .setDescription('The member to get stats for.')),
];

const verificationCommands = [
    new SlashCommandBuilder()
        .setName('manualcheck')
        .setDescription('Manually checks a member.')
        .addUserOption(option =>
            option
                .setName('member')
                .setDescription('The member to check.')),

    new SlashCommandBuilder()
        .setName('nsfwban')
        .setDescription('Bans a member from viewing NSFW channels.')
        .addUserOption(option =>
            option
                .setName('member')
                .setDescription('The member to ban.')
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
        .setName('unverify')
        .setDescription('Unverifies a member.')
        .addUserOption(option =>
            option
                .setName('member')
                .setDescription('The member to unverify.')
                .setRequired(true)),

    new SlashCommandBuilder()
        .setName('unnsfwban')
        .setDescription('Unnsfwbans a member.')
        .addUserOption(option =>
            option
                .setName('member')
                .setDescription('The member to unnsfwbans.')
                .setRequired(true)),

    new SlashCommandBuilder()
        .setName('verify')
        .setDescription('Verifies a member.')
        .addUserOption(option =>
            option
                .setName('member')
                .setDescription('The member to verify.')
                .setRequired(true))
        .addStringOption(option =>
            option
                .setName('reason')
                .setDescription('The reason for verification.'))
        .addBooleanOption(option =>
            option
                .setName('hide')
                .setDescription('Hide the ban from the general chat.')),
];

const commands = [
    ...funCommands,
    ...infoCommands,
    ...miscCommands,
    ...moderationCommands,
    ...settingsCommands,
    ...statisticsCommands,
    ...verificationCommands,
];

export default commands;