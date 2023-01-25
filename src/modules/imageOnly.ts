import guildSchema from '../schemas/guildSchema';
export = {
    check: async function(client: any) {
        const guildDocuments = await guildSchema.find();

        for (const guildDocument of guildDocuments) {
            const guild = client.guilds.cache.get(guildDocument.guildID);
            if (!guild) continue;

            if (!guildDocument.imageOnlyChannels) continue;

            for (const channelID of guildDocument.imageOnlyChannels) {
                const channel = guild.channels.cache.get(channelID);
                if (!channel) continue;

                const messages = await channel.messages.fetch();

                for (const message of messages) {
                    if (!message.attachments.size) {
                        message.delete();
                    }
                }
            }
        }

        delay(5 * 60).then(() => { this.check(client); });
    },
}

const delay = (seconds: number) => new Promise((resolve) => setTimeout(resolve, seconds * 1000));