import profileSchema from '../schemas/profileSchema';
import guildSchema from '../schemas/guildSchema';
export = {
    sync : async function(client: any) {
        try {

            const guilds = client.guilds.cache;
            const guildDocuments = await guildSchema.find();
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

                const guildDocument = guildDocuments.find((doc: any) => doc.guildID === guildID);

                if (!guildDocument) continue;
                if (!guildDocument.roles) continue;

                const guildMembers = await guild.members.fetch();
                const profileDocuments = await profileSchema.find();
                const profileDocumentsToSync = profileDocuments.filter((doc: any) => guildMembers.has(doc.userID));

                for (const profileDocument of profileDocumentsToSync) {
                    const { userID, verify, nsfw } = profileDocument;
                    const member = guild.members.cache.get(userID);

                    if (!(member || userID || verify || nsfw)) continue;

                    checkForVerifiedRole(guildDocument, guild, member, verify);
                    checkForNSFWBanRole(guildDocument, guild, member, nsfw);
                    checkForNSFWRole(guildDocument, guild, member, nsfw);
                }
            }

            delay(5 * 60).then(() => { this.sync(client); });
        }
        catch (error) {
            console.error(error);
        }
    },
}

const delay = (seconds: number) => new Promise((resolve) => setTimeout(resolve, seconds * 1000));

function checkForVerifiedRole(guildDocument: any, guild: any, member: any, verify: any) {
    if (!guildDocument.roles.verifiedRole) return;

    const verifiedRole = guild.roles.cache.get(guildDocument.roles.verifiedRole);

    if (verifiedRole && verify.verified) {
        member.roles.add(verifiedRole);
    }
    else if (verifiedRole && !verify.verified) {
        member.roles.remove(verifiedRole);
    }

}

function checkForNSFWBanRole(guildDocument: any, guild: any, member: any, nsfw: any) {
    if (!guildDocument.roles.nsfwBanRole) return;

    const nsfwBanRole = guild.roles.cache.get(guildDocument.roles.nsfwBanRole);

    if (nsfwBanRole && nsfw.nsfwBanned) {
        member.roles.add(nsfwBanRole);
    }
    else if (nsfwBanRole && !nsfw.nsfwBanned) {
        member.roles.remove(nsfwBanRole);
    }

}

function checkForNSFWRole(guildDocument: any, guild: any, member: any, nsfw: any) {
    if (!guildDocument.roles.nsfwRole) return;

    const nsfwRole = guild.roles.cache.get(guildDocument.roles.nsfwRole);

    if (nsfwRole && nsfw.nsfwBanned) {
        member.roles.remove(nsfwRole);
    }
}