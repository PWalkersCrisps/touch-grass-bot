import { CommandInteraction, EmbedBuilder, GuildMember, PermissionFlagsBits, SlashCommandBuilder, TextChannel } from 'discord.js';
import { InteractionCommand } from '../../../classes/command';

const modLogsChannelID = '826283823884927038';
const verifiedRoleID = '1044433028828643461';
const pornBanRoleID = '856414668003737621';
const unverifiedRoleID = '842480211151814668';

export class VerifyCommand extends InteractionCommand {
    constructor() {
        super();
        this.name = 'verify';
        this.description = 'placeholder';
        this.data = new SlashCommandBuilder()
            .setName(this.name)
            .setDescription(this.description)
            .setDMPermission(false)
            .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
            .setNSFW(this.nsfw)
            .addUserOption(option => option.setName('user').setDescription('The user to verify.').setRequired(true))
            .addIntegerOption(option => option.setName('day').setDescription('The day the user was born. (DD)').setRequired(true))
            .addIntegerOption(option => option.setName('month').setDescription('The month the user was born. (MM)').setRequired(true))
            .addIntegerOption(option => option.setName('year').setDescription('The year the user was born. (YYYY)').setRequired(true));
    }

    async execute(interaction: CommandInteraction): Promise<any> {
        const member = interaction.options.getMember('user') as GuildMember | null;

        if (!member) return interaction.reply({ content: 'User not found.', ephemeral: true });

        const day = interaction.options.get('day', true).value as number;
        const month = interaction.options.get('month', true).value as number;
        const year = interaction.options.get('year', true).value as number;

        const birthday = new Date(year, month - 1, day);

        const age = this.calculateAge(birthday);

        if (age < 13) {
            return interaction.reply({ content: 'What the fuck are you thinking??? This member is under 13?? Ban this mf...', ephemeral: true });
        }
        else if (age < 18) {
            return interaction.reply({ content: 'The member is under 18 years old.', ephemeral: true });
        }
        else if (age > 30) {
            return interaction.reply({ content: 'The member is over 30, this cannot be allowed. The reasoning behind this is it is concievably possible that someone born in 1993 could have a 13 year old child, which is the minimum allowed age that someone can join discord; therefore it is not unreasonable to assume any id before today\'s date in 1993 is a parents\' id' });
        }

        if (this.checkForRole(member, verifiedRoleID)) {
            return interaction.reply({ content: 'This member is already verified', ephemeral: true });
        }
        else {
            member.roles.add(verifiedRoleID);
        }

        if (this.checkForRole(member, pornBanRoleID)) {
            member.roles.remove(pornBanRoleID);
        }

        if (this.checkForRole(member, unverifiedRoleID)) {
            member.roles.remove(unverifiedRoleID);
        }

        const verifyEmbed = new EmbedBuilder()
            .setTitle('Verification')
            .setDescription(`<@${member.id}> has been verified by <@${interaction.user.id}>.`)
            .setColor('#00ff00')
            .addFields(
                { name: 'Age', value: age.toString(), inline: true },
                { name: 'DoB', value: birthday.toDateString(), inline: true },
            );

        interaction.reply({ embeds: [verifyEmbed] });

        const modLogsChannel = interaction.client.channels.cache.get(modLogsChannelID) as TextChannel | undefined;
        if (modLogsChannel) {
            modLogsChannel.send({ embeds: [verifyEmbed] });
        }
    }

    checkForRole(member: GuildMember, roleID: string) {
        return member.roles.cache.get(roleID);
    }

    calculateAge(birthday: Date) {
        const ageDifMs = Date.now() - birthday.getTime();
        const ageDate = new Date(ageDifMs);
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    }
}

export default new VerifyCommand();