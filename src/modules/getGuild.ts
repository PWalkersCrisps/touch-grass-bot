import GuildSettings, { IGuild } from '../schemas/guildModel';

export default async function getGuild(guildID: string): Promise<IGuild | null> {
    const guildSettings = await GuildSettings.getGuildById(guildID);
    if (!guildSettings) {
        const newGuildSettings = await new GuildSettings(guildID);
        return newGuildSettings.save();
    }
    return guildSettings;
}