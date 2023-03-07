/* eslint-disable no-unused-vars */
declare module 'ascii-table';
declare module 'weighted-random';

type RPS = 'rock' | 'paper' | 'scissors';

type ProfileDocumentResults = {
    userID: string;
    verify: Verify;
    nsfw: NSFW;
}

type ServerLogType = 'nsfwban' | 'verify';
type ConsoleLogType = 'log' | 'warn' | 'error' | 'debug';

type SuggestionParams = {
    interaction: ChatInputCommandInteraction<'cached'>,
    guildData: GuildDocument,
}