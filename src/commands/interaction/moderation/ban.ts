import { CommandInteraction, EmbedBuilder, PermissionFlagsBits, SlashCommandBuilder, TextChannel } from 'discord.js';
import { InteractionCommand } from '../../../classes/command';

const modLogsChannelID = '826283823884927038';

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
            .addStringOption(option => option.setName('reason').setDescription('The reason for banning the user.').setRequired(false));
    }

    async execute(interaction: CommandInteraction): Promise<any> {

        // Get the mentioned user to ban
        const user = interaction.options.getUser('user', true);
        const reason = interaction.options.get('reason', false)?.value as string || 'No reason provided.';

        const modLogsChannel: TextChannel | undefined = interaction.client.channels.cache.get(modLogsChannelID) as TextChannel | undefined;

        if (!user) return interaction.reply('User not found.');

        interaction.guild?.members.fetch(user.id).then(member => {
            if (!member.bannable) {
                return interaction.reply('This user is not bannable.');
            }
        });

        const banEmbed = new EmbedBuilder()
            .setTitle('User Banned')
            .setDescription(`**${user.tag}** has been banned from the server.`)
            .setColor('#ff0000')
            .addFields(
                { name: 'Reason', value: reason }
            );

        if (modLogsChannel) {
            await modLogsChannel.send({ embeds: [banEmbed] });
        }

        try {
            // Ban the user
            await interaction.guild?.members.ban(user, { reason: reason });
            interaction.reply({ embeds: [banEmbed] });
        }
        catch (error) {
            console.error(error);
            interaction.reply('An error occurred while trying to ban the user.');
        }
    }
}

export default new BanCommand();