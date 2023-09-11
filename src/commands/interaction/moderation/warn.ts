import { CommandInteraction, SlashCommandBuilder } from 'discord.js';
import { InteractionCommand } from '../../../classes/command';

export class WarnCommand extends InteractionCommand {
    constructor() {
        super();
        this.name = 'warn';
        this.description = 'placeholder';
        this.data = new SlashCommandBuilder()
            .setName(this.name)
            .setDescription(this.description)
            .setDMPermission(false)
            .setNSFW(this.nsfw);
    }

    async execute(interaction: CommandInteraction) {
        interaction.reply({ content: 'This command needs to be finished' });
    }
}

export default new WarnCommand();