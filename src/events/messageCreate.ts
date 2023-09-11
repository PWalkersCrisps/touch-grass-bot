import { EmbedBuilder, Events, Message, TextChannel } from 'discord.js';
import BotEvent from '../classes/event';
import { config } from 'dotenv';

import slursExact from '../data/slursExact.json';
import slursWildcard from '../data/slursWildcard.json';

config();

const modLogsChannelID = '826283823884927038';
const modRoleID = '811018391913627688';

class MessageCreate extends BotEvent {

    constructor() {
        super();
        this.name = Events.MessageCreate;
    }

    async execute(message: Message) {
        if (this.containsSlur(message)) {
            this.removeSlur(message);
        }
    }

    containsSlur(message: Message): boolean {
        const slurFilterPattern = new RegExp('\\b(' + slursWildcard.join('|') + ')\\b', 'g');

        const wildcardMatch: boolean = slurFilterPattern.test(message.content);

        const splitMessage = message.content.toLowerCase().split(' ');

        const exactMatch: boolean = this.arraysHaveMatchingString(splitMessage, slursExact);

        return wildcardMatch || exactMatch;
    }

    async removeSlur(message: Message): Promise<void> {
        const modLogsChannel: TextChannel | undefined = message.client.channels.cache.get(modLogsChannelID) as TextChannel | undefined;

        let modLogsMessage: Message | undefined;

        if (modLogsChannel) {

            const modLogsEmbed = new EmbedBuilder()
                .setTitle('Slur Filter')
                .setDescription(`<@${message.author.id}> sent a slur`)
                .setFields(
                    { name: 'Message', value: `<@${message.author.id}>: ${message.content}` },
                );

            modLogsMessage = await modLogsChannel.send({ embeds: [modLogsEmbed] });
        }

        const replyMessage = `||<@&${modRoleID}>||`;
        const replyEmbed = new EmbedBuilder()
            .setTitle('Slur Filter')
            .setDescription(`<@${message.author.id}> Said a slur!!`);

        if (modLogsMessage) {
            replyEmbed.addFields({
                name: 'Mod Logs Link:',
                value: modLogsMessage.url,
            });
        }

        message.reply({ content:  replyMessage, embeds: [replyEmbed] }).then(() => message.delete());
    }

    arraysHaveMatchingString(arr1: string[], arr2: string[]): boolean {
        return arr1.some(item1 => arr2.some(item2 => item1 === item2));
    }
}

export default new MessageCreate();