import { DJSCommand } from '../../declarations';
import time from '../../modules/time';
import { EmbedBuilder } from 'discord.js';

module.exports = {
    name: 'uptime',
    description: 'Check how long has the bot been online.',
    async execute({ client, interaction, profileData, guildData }: DJSCommand) {

        const duration = time.parseDur(client.uptime as any);
        const pEmbed: EmbedBuilder = new EmbedBuilder()
            .setTitle(':inbox_tray: Online for')
            .setColor(0x0000ff)
            .setDescription(
                `**${duration}**`,
            );
        interaction.reply({ embeds: [pEmbed] });
    },
};