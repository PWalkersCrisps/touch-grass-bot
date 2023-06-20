import { CommandInteraction, PermissionFlagsBits, SlashCommandBuilder } from 'discord.js';
import { InteractionCommand } from '../../../classes/command';

export class KickCommand extends InteractionCommand {
    constructor() {
        super();
        this.name = 'kick';
        this.description = 'Kick a user from the server.';
        this.data = new SlashCommandBuilder()
            .setName(this.name)
            .setDescription(this.description)
            .setDMPermission(false)
            .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)
            .setNSFW(this.nsfw)
            .addUserOption(option => option.setName('user').setDescription('The user to kick.').setRequired(true))
            .addStringOption(option => option.setName('reason').setDescription('The reason for kicking the user.').setRequired(false));
    }

    async execute(interaction: CommandInteraction): Promise<any> {

        const user = interaction.options.getUser('user', true);
        const reason: string = interaction.options.get('reason', false)?.value as string || 'No reason provided.';

        if (!interaction.guild?.available) return;

        const member = interaction.guild.members.cache.get(user.id);

        if (!member) return interaction.reply({ content: 'That user is not in this server!', ephemeral: true });

        if (!member.kickable) return interaction.reply({ content: 'That user is not kickable!', ephemeral: true });

        await member.kick(reason);

        return interaction.reply({ content: `Successfully kicked ${member.user.tag}!` });

    }
}

export default new KickCommand();