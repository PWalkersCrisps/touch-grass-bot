import guildSchema from '../schemas/guildSchema';
import { Message, TextChannel, Collection } from 'discord.js';
export default async function check(client: any) {
    const guildDocuments = await guildSchema.find();

    for (const guildDocument of guildDocuments) {
        const guild = client.guilds.cache.get(guildDocument.guildID);
        if (!guild) continue;

        if (!guildDocument.imageOnlyChannels) continue;

        for (const channelID of guildDocument.imageOnlyChannels) {
            const channel: TextChannel = guild.channels.cache.get(channelID);
            if (!channel) continue;

            const messages: Collection<string, Message<true>> = await channel.messages.fetch();

            for (const message of messages) {
                if (message[1].attachments.size === 0) {
                    message[1].delete();
                }
            }
        }
    }

    delay(60 * 60).then(() => { check(client); });
}

const delay = (seconds: number) => new Promise((resolve) => setTimeout(resolve, seconds * 1000));