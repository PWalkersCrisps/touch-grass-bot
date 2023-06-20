import { CommandInteraction, PermissionFlagsBits, SlashCommandBuilder } from 'discord.js';
import { InteractionCommand } from '../../../classes/command';

export class BanCommand extends InteractionCommand {
    constructor() {
        super();
        this.name = 'ban';
        this.description = 'Ban a user from the server.';
        this.data = new SlashCommandBuilder()
            .setName(this.name)
            .setDescription(this.description)
            .setDMPermission(false)
            .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
            .setNSFW(this.nsfw)
            .addUserOption(option => option.setName('user').setDescription('The user to ban.').setRequired(true))
            .addStringOption(option => option.setName('reason').setDescription('The reason for banning the user.').setRequired(false))
            .addBooleanOption(option => option.setName('delete').setDescription('Whether to delete the user\'s messages or not.').setRequired(false));
    }

    async execute(interaction: CommandInteraction): Promise<any> {

        const user = interaction.options.getUser('user', true);
        const reason: string = interaction.options.get('reason', false)?.value as string || 'No reason provided.';
        const deleteMessages: boolean = interaction.options.get('delete', false)?.value as boolean || false;

        if (!interaction.guild?.available) return;

        const member = interaction.guild.members.cache.get(user.id);

        if (!member) return interaction.reply({ content: 'That user is not in this server!', ephemeral: true });

        if (!member.bannable) return interaction.reply({ content: 'That user is not bannable!', ephemeral: true });

        await member.ban({ deleteMessageSeconds: deleteMessages ? 60 * 60 * 24 : 0, reason: reason });

    }
}

export default new BanCommand();