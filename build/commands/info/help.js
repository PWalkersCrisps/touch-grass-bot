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
/* eslint-disable @typescript-eslint/no-var-requires */
const discord_js_1 = require("discord.js");
const fs_1 = require("fs");
const random_1 = __importDefault(require("../../modules/random"));
module.exports = {
    name: 'help',
    description: 'Help command',
    execute({ client, interaction }) {
        return __awaiter(this, void 0, void 0, function* () {
            const commandChosen = interaction.options.getString('command');
            if (!commandChosen) {
                getHelpCategories(interaction);
            }
            else {
                getHelpCommand(client, interaction, commandChosen);
            }
        });
    },
};
function getHelpCategories(interaction) {
    const categories = [];
    (0, fs_1.readdirSync)('./build/commands/').forEach((dir) => {
        const commands = (0, fs_1.readdirSync)(`./build/commands/${dir}/`).filter(file => file.endsWith('.js'));
        const cmds = commands.map((command) => {
            const file = require(`../../commands/${dir}/${command}`);
            if (!file.name) {
                return 'No file name';
            }
            const name = file.name.replace('', '');
            return `\`${name}\``;
        });
        categories.push({ name: dir.toUpperCase(), value: cmds.length === 0 ? 'Incomplete' : cmds.join(' | ') });
    });
    const embed = new discord_js_1.EmbedBuilder()
        .setTitle('Commands')
        .setDescription('Use `/help [command]` to get more info about a command')
        .setFooter({ text: `Requested by ${interaction.user.username}`, iconURL: interaction.user.avatarURL({ dynamic: true }) })
        .setColor(random_1.default.randomHexColour())
        .addFields(categories);
    return interaction.reply({ embeds: [embed] });
}
function getHelpCommand(client, interaction, commandChosen) {
    const command = client.commands.get(commandChosen);
    const embed = new discord_js_1.EmbedBuilder()
        .setTitle('Command Details')
        .addFields({ name: 'Command:', value: command.name ? `\`${command.name}\`` : 'No name for this command' }, { name: 'Description:', value: command.description ? command.description : 'No description for this command.' })
        .setFooter({ text: `Requested by ${interaction.user.username}`, iconURL: interaction.user.avatarURL({ dynamic: true }) })
        .setColor(random_1.default.randomHexColour());
    return interaction.reply({ embeds: [embed] });
}
