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

        const exactMatch: boolean = slursExact.some((slur: string) => message.content.toLowerCase().includes(slur.toLowerCase()));

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
}

export default new MessageCreate();