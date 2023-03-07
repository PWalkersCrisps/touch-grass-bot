import { EmbedBuilder, GuildMember } from 'discord.js';

module.exports = {
    name: 'sex',
    description: 'Have e-sex with someone',
    async execute({ interaction }: InteractionCommandArgs) {

        const target: GuildMember = interaction.options.getMember('target');

        const random: boolean = Math.random() >= 0.5;

        const sexEmbed: EmbedBuilder = new EmbedBuilder()
            .setTitle('Sex')
            .setDescription(random ? `<@${interaction.member.id}> is topping <@${target.id}>`
                : `<@${target.id}> is topping <@${interaction.member.id}>`)
            .setImage('https://cdn.discordapp.com/attachments/1082411992830185643/1082419699230457867/unknown-11-1.png');

        interaction.reply({ embeds: [sexEmbed] });
    },
};