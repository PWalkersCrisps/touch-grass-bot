"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const moment_1 = __importDefault(require("moment"));
const os_1 = require("os");
const modifyString_1 = __importDefault(require("../../modules/modifyString"));
const time_1 = __importDefault(require("../../modules/time"));
const config_json_1 = require("../../data/config.json");
module.exports = {
    name: 'botinfo',
    description: 'Displays indept information about the bot.',
    execute({ client, interaction }) {
        return __awaiter(this, void 0, void 0, function* () {
            const generalInfo = {
                name: '<:documents:773950876347793449> General ❯',
                inline: false,
                value: `>>> **<:card:773965449402646549> Bot Name: ${client.user.tag}**\n
                    **📇 Bot ID: ${client.user.id}**\n
                    **👑 Bot Owner: ${client.users.cache.get(config_json_1.botOwner).tag}**\n
                    **💻 Bot Dev: ${client.users.cache.get(config_json_1.botDeveloper).tag}**\n
                    **🌐 Servers: ${client.guilds.cache.size.toLocaleString()} Servers**\n
                    **👥 Users: ${client.users.cache.size.toLocaleString()} Users**\n
                    **📺 Channels: ${client.channels.cache.size.toLocaleString()} Channels**\n
                    **💬 Commands: ${client.commands.size} Commands**\n
                    **📅 Created: ${(0, moment_1.default)(client.user.createdTimestamp).format('MMMM Do YYYY, h:mm:ss')} | ${Math.floor((Date.now() - client.user.createdTimestamp) / 86400000)} day(s) ago**\n`,
            };
            const systemInfo = {
                name: '<:documents:773950876347793449> System ❯',
                inline: false,
                value: `>>> **<:online:745651877382717560> Uptime: ${time_1.default.parseDur(client.uptime)}**\n
                    **<:nodejs:773599989724348448> Node: ${process.version}**\n
                    **<:djs:773599989833400371> discord.js: v${discord_js_1.version}**\n
                    **🖥 Platform: ${os_1.platform.toString()}**\n
                    **📊 Memory: ${modifyString_1.default.formatBytes(process.memoryUsage().heapUsed)} / ${modifyString_1.default.formatBytes(process.memoryUsage().heapTotal)}**\n
                    **💻 CPU: ${(0, os_1.cpus)()[0].model.split('CPU')[0]}${(0, os_1.cpus)().length} Cores ${(0, os_1.cpus)()[0].model.split('CPU ')[1]}**`,
            };
            const embed = new discord_js_1.EmbedBuilder()
                .setThumbnail(client.user.displayAvatarURL({ dynamic: true, size: 512 }))
                .setColor(interaction.guild.members.cache.get(client.user.id).displayHexColor)
                .setFooter({ text: `Requested by ${interaction.user.tag}` })
                .setTimestamp()
                .setTitle('Bot Information')
                .addFields(generalInfo, systemInfo);
            interaction.reply({ embeds: [embed] });
        });
    },
};
