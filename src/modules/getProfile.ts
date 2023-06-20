import Profile, { IProfile } from '../schemas/profileModel';

export default async function getProfile(userID: string, guildID: string): Promise<IProfile | null> {
    const profile = await Profile.getProfileById(userID, guildID);
    if (!profile) {
        const newProfile = await new Profile(userID, guildID);
        return newProfile.save();
    }
    return profile;
}