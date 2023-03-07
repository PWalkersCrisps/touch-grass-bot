import { GuildMember, EmbedBuilder, ColorResolvable } from 'discord.js';

module.exports = {
    name: 'avatar',
    description: 'Shows a users avatar',
    async execute({ interaction }: InteractionCommandArgs) {

        const member: GuildMember = interaction.options.getMember('member') || interaction.member;

        const avatarEmbed: EmbedBuilder = new EmbedBuilder()
            .setTitle(`${member.user.tag}'s Avatar`)
            .setImage(member.user.displayAvatarURL({ size: 4096 }))
            .setColor('Random' as ColorResolvable);

        interaction.reply({ embeds: [avatarEmbed] });

    },
};