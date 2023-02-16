/* eslint-disable @typescript-eslint/no-var-requires */
import { EmbedBuilder, APIEmbedField } from 'discord.js';
import { readdirSync } from 'fs';
import random from '../../modules/random';
import { DJSCommand } from '../../declarations';

module.exports = {
    name: 'help',
    description: 'Help command',
    async execute({ client, interaction, profileData, guildData }: DJSCommand) {


        const commandChosen = interaction.options.getString('command');

        if (commandChosen && !client.commands.has(commandChosen)) {
            return interaction.reply({ content: 'That command does not exist!', ephemeral: true });
        }

        if (!commandChosen) {
            getHelpCategories(interaction);
        }
        else {
            getHelpCommand(client, interaction, commandChosen);
        }
    },
};

function getHelpCategories(interaction: any) {
    const categories: APIEmbedField[] = [];
    readdirSync('./build/commands/').forEach((dir) => {
        const commands: string[] = readdirSync(`./build/commands/${dir}/`).filter(file => file.endsWith('.js'));

        const cmds: string[] = commands.map((command: string) => {
            const file: any = require(`../../commands/${dir}/${command}`);
            if (!file.name) { return 'No file name'; }

            const name: string = file.name.replace('', '');

            return `\`${name}\``;

        });

        categories.push({ name: dir.toUpperCase(), value: cmds.length === 0 ? 'Incomplete' : cmds.join(' | ') });

    });

    const embed: EmbedBuilder = new EmbedBuilder()
        .setTitle('Commands')
        .setDescription('Use `/help [command]` to get more info about a command')
        .setFooter({ text: `Requested by ${interaction.user.username}`, iconURL: interaction.user.avatarURL() })
        .setColor(random.randomHexColour())
        .addFields(categories);

    return interaction.reply({ embeds: [embed] });
}

function getHelpCommand(client: any, interaction: any, commandChosen: string) {
    const command = client.commands.get(commandChosen);
    const embed: EmbedBuilder = new EmbedBuilder()
        .setTitle('Command Details')
        .addFields(
            { name: 'Command:', value: command.name ? `\`${command.name}\`` : 'No name for this command' },
            { name: 'Description:', value: command.description ? command.description : 'No description for this command.' },
        )
        .setFooter({ text: `Requested by ${interaction.user.username}`, iconURL: interaction.user.avatarURL() })
        .setColor(random.randomHexColour());
    return interaction.reply({ embeds: [embed] });
}