/* eslint-disable @typescript-eslint/no-var-requires */
import { EmbedBuilder, APIEmbedField, CommandInteraction } from 'discord.js';
import { readdirSync } from 'fs';
import { randomHexColour } from '../../../modules/random';

module.exports = {
    name: 'help',
    description: 'Help command',
    async execute({ client, interaction }: InteractionCommandArgs) {
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

function getHelpCategories(interaction: CommandInteraction) {
    const categories: APIEmbedField[] = [];
    readdirSync('./build/commands/interaction/').forEach((dir) => {
        const commands: string[] = readdirSync(`./build/commands/interaction/${dir}/`).filter(file => file.endsWith('.js'));

        const cmds: string[] = commands.map((command: string) => {
            const file: any = require(`../../interaction/${dir}/${command}`);
            if (!file.name) { return 'No file name'; }

            const name: string = file.name.replace('', '');

            return `\`${name}\``;

        });

        categories.push({ name: dir.toUpperCase(), value: cmds.length === 0 ? 'Incomplete' : cmds.join(' | ') });

    });

    const embed: EmbedBuilder = new EmbedBuilder()
        .setTitle('Commands')
        .setDescription('Use `/help [command]` to get more info about a command')
        .setFooter({ text: `Requested by ${interaction.user.username}`, iconURL: interaction.user.avatarURL() as string })
        .setColor(randomHexColour())
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
        .setColor(randomHexColour());
    return interaction.reply({ embeds: [embed] });
}