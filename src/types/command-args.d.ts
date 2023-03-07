/* eslint-disable no-unused-vars */
interface InteractionCommandArgs {
    client: Client;
    interaction: ChatInputCommandInteraction | CommandInteraction | Interaction;
    profileData: ProfileDocument | undefined | null;
    guildData: GuildDocument | undefined | null;
}

interface MessageCommandArgs {
    client: Client;
    message: Message;
    args: string[];
    profileData: ProfileDocument | undefined | null;
    guildData: GuildDocument | undefined | null;
}

interface ButtonInteractionArgs {
    client: Client;
    interaction: ButtonInteraction;
    profileData: ProfileDocument | undefined | null;
    guildData: GuildDocument | undefined | null;
}