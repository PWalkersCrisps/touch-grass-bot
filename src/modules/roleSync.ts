import profileSchema from '../schemas/profileSchema';
import guildSchema from '../schemas/guildSchema';
import { Client } from 'discord.js';
import { checkForNSFWBanRole, checkForVerifiedRole, checkForNSFWRole } from './checkPerms';


export default async function roleSync(client: Client) {
    try {

        const guilds = client.guilds.cache;
        const guildDocuments: GuildDocument[] = await guildSchema.find();
        const guildIDs = guildDocuments.map((doc: any) => doc.guildID);
        const guildsToSync = guilds.filter((guild: any) => guildIDs.includes(guild.id));

        /* Explanation for what to should do:

            Just a concept but...

            so like every 60 seconds, a function is run on the bot, the bot looks at the profiledata database it looks at one user and goes through each server that user is on,
            the bot then checks the roles that the guild uses then if they exist,
            it then checks if the user is porn banned or verified (imagine they are currently verified),
            the bot then gives the user the verified role for that server
            */

        for (const [guildID, guild] of guildsToSync) {

            const guildDocument: GuildDocument | undefined = guildDocuments.find((doc: any) => doc.guildID === guildID);

            if (!guild.available) continue;
            if (!guildDocument) continue;
            if (!guildDocument.roles) continue;
            if (!guildDocument.syncImports) continue;

            const guildMembers = await guild.members.fetch();
            const profileDocuments = await profileSchema.find();
            const profileDocumentsToSync = profileDocuments.filter((doc: any) => guildMembers.has(doc.userID));

            for (const profileDocument of profileDocumentsToSync) {
                const { userID, verify, nsfw }: ProfileDocumentResults = profileDocument as ProfileDocumentResults;
                if (!guildDocument.roles.verifiedRole && !guildDocument.roles.nsfwBanRole && !guildDocument.roles.nsfwRole) continue;
                if (!userID) continue;
                const member = guild.members.cache.get(userID);

                if (!member || member.user.bot) continue;

                const user = client.user;
                if (!user) continue;
                const clientMember = guild.members.resolve(user);
                if (!clientMember) continue;

                if (member.roles.highest.position >= clientMember.roles.highest.position as any) continue;

                checkForVerifiedRole(guildDocument, guild, member, verify);
                checkForNSFWBanRole(guildDocument, guild, member, nsfw);
                checkForNSFWRole(guildDocument, guild, member, nsfw);
            }
        }

        delay(5 * 60).then(() => { roleSync(client); });
    }
    catch (error) {
        console.error(error);
    }
}

const delay = (seconds: number) => new Promise((resolve) => setTimeout(resolve, seconds * 1000));

