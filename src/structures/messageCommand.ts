/* eslint-disable no-unused-vars */
export class InteractionCommand {
    name: string;
    description: string;
    alias: string[];
    usage: string;
    cooldown: number;
    disabled: boolean;
    nsfw: boolean;

    constructor() {
        this.name = '';
        this.description = '';
        this.alias = [];
        this.usage = '';
        this.cooldown = 5;
        this.disabled = false;
        this.nsfw = false;
    }

    async execute({ client, interaction, profileData, guildData }: InteractionCommandArgs) {
        throw new Error(`Command ${this.name} doesn't provide an execute() method!`);
    }

    reload() {
        return require.resolve(`../commands/interaction/${this.name}`);
    }
}