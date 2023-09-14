import { CommandInteraction, GuildMember, PermissionFlagsBits, Role, SlashCommandBuilder } from 'discord.js';
import { InteractionCommand } from '../../../classes/command';

export class RoleCommand extends InteractionCommand {
    constructor() {
        super();
        this.name = 'role';
        this.description = 'Give a user a role';
        this.data = new SlashCommandBuilder()
            .setName(this.name)
            .setDescription(this.description)
            .setDMPermission(false)
            .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles)
            .setNSFW(this.nsfw)
            .addUserOption(option => option.setName('user').setDescription('The user to give the role to.').setRequired(true))
            .addRoleOption(option => option.setName('role').setDescription('The role to give to the user.').setRequired(true));

    }

    async execute(interaction: CommandInteraction): Promise<any> {

        if (!interaction.isChatInputCommand()) return;

        const member = interaction.options.getMember('user') as GuildMember | null;
        const role = interaction.options.getRole('role', true) as Role | null;

        if (!member) return interaction.reply({ content: 'That user is not in this server!', ephemeral: true });

        if (!role) return interaction.reply({ content: 'That role does not exist!', ephemeral: true });

        if (!member.roles.cache.has(role.id)) {
            await member.roles.add(role);
            return interaction.reply({ content: `Successfully gave ${member.user.tag} the ${role.name} role!` });
        }

        await member.roles.remove(role);
        return interaction.reply({ content: `Successfully removed the ${role.name} role from ${member.user.tag}!` });
    }
}

export default new RoleCommand();