import { TouchGrassClient } from '../classes/client';
import banSchema = require('../schemas/banSchema');

export default async function checkBan(client: TouchGrassClient) {
    const banDocuments: BanDocument[] = await banSchema.find({});

    banDocuments.forEach(async (banDocument: BanDocument) => {
        if (banDocument.permanant) return;
        if (banDocument.expires.getTime() > Date.now()) return;

        const guild = client.guilds.cache.get(banDocument.guildID);
        if (!guild) return;

        const member = await guild.members.fetch(banDocument.userID);
        if (!member) return;

        guild.members.unban(banDocument.userID);
    });
}