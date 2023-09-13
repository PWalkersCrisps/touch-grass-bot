import { CommandInteraction, PermissionFlagsBits, SlashCommandBuilder } from 'discord.js';
import { InteractionCommand } from '../../../classes/command';

export class MuteCommand extends InteractionCommand {
    constructor() {
        super();
        this.name = 'mute';
        this.description = 'Mute a user.';
        this.data = new SlashCommandBuilder()
            .setName(this.name)
            .setDescription(this.description)
            .setDMPermission(false)
            .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
            .setNSFW(this.nsfw)
            .addUserOption(option => option.setName('user').setDescription('The user to muting.').setRequired(true))
            .addStringOption(option => option.setName('reason').setDescription('The reason for muting the user.').setRequired(false))
            .addIntegerOption(option => option.setName('seconds').setDescription('The number of seconds to mute the user for.').setRequired(false))
            .addIntegerOption(option => option.setName('minutes').setDescription('The number of minutes to mute the user for.').setRequired(false))
            .addIntegerOption(option => option.setName('hours').setDescription('The number of hours to mute the user for.').setRequired(false))
            .addIntegerOption(option => option.setName('days').setDescription('The number of days to mute the user for.').setRequired(false));
    }

    async execute(interaction: CommandInteraction): Promise<any> {

        const user = interaction.options.getUser('user', true);
        const reason: string = interaction.options.get('reason', false)?.value as string || 'No reason provided.';
        const days: number = interaction.options.get('days', false)?.value as number || 0;
        const hours: number = interaction.options.get('hours', false)?.value as number || 0;
        const minutes: number = interaction.options.get('minutes', false)?.value as number || 0;
        const seconds: number = interaction.options.get('seconds', false)?.value as number || 0;

        if (!interaction.guild?.available) return;

        const member = interaction.guild.members.cache.get(user.id);

        if (!member) return interaction.reply({ content: 'That user is not in this server!', ephemeral: true });

        if (!member.moderatable) return interaction.reply({ content: 'That user is not muteable!', ephemeral: true });

        const duration = (((days * 86400) + (hours * 3600) + (minutes * 60) + seconds) * 1000);

        await member.timeout((duration >= 1000) ? (duration / 1000) : (60 * 60 * 1000), reason);

        return interaction.reply({ content: `Successfully muted ${member.user.tag} for ${ (duration >= 1000) ? (duration / 1000) : (60 * 60)} seconds!` });
    }
}

export default new MuteCommand();