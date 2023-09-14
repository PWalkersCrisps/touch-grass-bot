import { CommandInteraction, EmbedBuilder, GuildMember, PermissionFlagsBits, SlashCommandBuilder, TextChannel } from 'discord.js';
import { InteractionCommand } from '../../../classes/command';

const pornBanRoleID = '856414668003737621';
const unverifiedRoleID = '842480211151814668';
const modLogsChannelID = '826283823884927038';

export class PBanCommand extends InteractionCommand {
    constructor() {
        super();
        this.name = 'pban';
        this.description = 'placeholder';
        this.data = new SlashCommandBuilder()
            .setName(this.name)
            .setDescription(this.description)
            .setDMPermission(false)
            .setNSFW(this.nsfw)
            .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
            .addUserOption(option => option.setName('user').setDescription('The user to porn-ban.').setRequired(true))
            .addStringOption(option => option.setName('reason').setDescription('The reason for porn-ban'));
    }

    async execute(interaction: CommandInteraction): Promise<any> {

        const member = interaction.options.getMember('user') as GuildMember | null;
        const reason = interaction.options.get('reason')?.value as string || 'No reason provided.';

        if (!member) return interaction.reply({ content: 'User not found.', ephemeral: true });


        if (member.roles.cache.has(pornBanRoleID)) {
            return interaction.reply({ content: 'Member is already porn-banned.', ephemeral: true });
        }
        else {
            member.roles.add(pornBanRoleID);
        }

        if (member.roles.cache.has(unverifiedRoleID)) {
            member.roles.remove(unverifiedRoleID);
        }

        const pbanEmbed = new EmbedBuilder()
            .setTitle('Porn Banned')
            .setDescription(`<@${member.id}> has been porn banned.`)
            .setColor('#ff0000')
            .addFields(
                { name: 'Reason', value: reason }
            );

        await interaction.reply({ embeds: [pbanEmbed] });

        const modLogsChannel = interaction.client.channels.cache.get(modLogsChannelID) as TextChannel | undefined;
        if (modLogsChannel) {
            modLogsChannel.send({ embeds: [pbanEmbed] });
        }

    }
}

export default new PBanCommand();