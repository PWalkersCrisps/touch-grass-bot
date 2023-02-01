import { version as djsversion, EmbedBuilder } from 'discord.js';

import moment from 'moment';
import { platform, cpus } from 'os';

import modifyString from '../../modules/modifyString';
import time from '../../modules/time';
import { botOwner, botDeveloper } from '../../data/config.json';
import { DJSCommand } from '../../declarations';

module.exports = {
    name: 'botinfo',
    description: 'Displays indept information about the bot.',
    async execute({ client, interaction, profileData, guildData }: DJSCommand) {


        const cpu = cpus()[0].model.split('CPU');
        const clientUser: any = client?.user;
        if (!clientUser) return interaction.reply({ content: 'There was an error while fetching the client user.', ephemeral: true });

        const generalInfo = {
            name: '<:documents:773950876347793449> General ❯',
            inline: false,
            value: `>>> **<:card:773965449402646549> Bot Name: ${client?.user?.tag}**\n
                    **📇 Bot ID: ${clientUser.id}**\n
                    **👑 Bot Owner: ${clientUser.cache.get(botOwner).tag}**\n
                    **💻 Bot Dev: ${clientUser.cache.get(botDeveloper).tag}**\n
                    **🌐 Servers: ${client.guilds.cache.size.toLocaleString()} Servers**\n
                    **👥 Users: ${client.users.cache.size.toLocaleString()} Users**\n
                    **📺 Channels: ${client.channels.cache.size.toLocaleString()} Channels**\n
                    **💬 Commands: ${client.commands.size} Commands**\n
                    **📅 Created: ${moment(client.user?.createdTimestamp).format('MMMM Do YYYY, h:mm:ss')} | ${Math.floor((Date.now() - clientUser.createdTimestamp) / 86400000)} day(s) ago**\n`,
        };

        const systemInfo = {
            name: '<:documents:773950876347793449> System ❯',
            inline: false,
            value: `>>> **<:online:745651877382717560> Uptime: ${time.parseDur(client.uptime as any)}**\n
                    **<:nodejs:773599989724348448> Node: ${process.version}**\n
                    **<:djs:773599989833400371> discord.js: v${djsversion}**\n
                    **🖥 Platform: ${platform.toString()}**\n
                    **📊 Memory: ${modifyString.formatBytes(process.memoryUsage().heapUsed)} / ${modifyString.formatBytes(process.memoryUsage().heapTotal)}**\n

                    **💻 CPU: ${cpu[0]}${cpus().length} Cores ${cpu[1]}**`,
        };

        const embed: EmbedBuilder = new EmbedBuilder()
            .setThumbnail(clientUser.displayAvatarURL({ dynamic: true, size: 512 }))
            .setColor(interaction.guild.members.cache.get(clientUser.id).displayHexColor)
            .setFooter({ text: `Requested by ${interaction.user.tag}` })
            .setTimestamp()
            .setTitle('Bot Information')
            .addFields(generalInfo, systemInfo);
        interaction.reply({ embeds: [embed] });

    },
};