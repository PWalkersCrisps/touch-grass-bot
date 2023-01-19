import { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';

module.exports = {
    name: 'invite',
    description: 'Invite the bot to your server',
    async execute({ interaction }: any) {
        const embed: EmbedBuilder = new EmbedBuilder()
            .setTitle('Invite the bot to your server')
            .setDescription('Click the button below to invite the bot to your server')
            .setColor(0x00ff00);

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setStyle(ButtonStyle.Link)
                    .setLabel('Discord Server')
                    .setURL('https://discord.gg/dgGdUBUAGG'),
                new ButtonBuilder()
                    .setStyle(ButtonStyle.Link)
                    .setLabel('Invite')
                    .setURL('https://discord.com/api/oauth2/authorize?client_id=988495890077589544&permissions=2147534848&scope=bot%20applications.commands')
            );

        interaction.reply({ embeds: [embed], components: [row] });

    },
};

