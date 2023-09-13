import { model, Schema, Document } from 'mongoose';

export interface IProfileRoles extends Document {
    userID: string;
    guildID: string;
    roleIDs: string[];
}

const profileRolesSchema = new Schema({
    userID: { type: Schema.Types.String, required: true, unique: true },
    guildID: { type: Schema.Types.String, required: true },
    roleIDs: { type: [Schema.Types.String], required: true },
}, { timestamps: true });

const ProfileRolesModel = model<IProfileRoles>('profileroles', profileRolesSchema);

class ProfileRoles {
    userID: string;
    guildID: string;
    roleIDs: string[];

    constructor(userID: string, guildID: string) {
        this.userID = userID;
        this.guildID = guildID;
        this.roleIDs = [];
    }

    static async getAllProfiles(): Promise<IProfileRoles[]> {
        return ProfileRolesModel.find();
    }

    static async getProfileById(userID: string, guildID: string): Promise<IProfileRoles | null> {
        return ProfileRolesModel.findOneAndUpdate({ userID, guildID }, { userID, guildID }, { upsert: true, new: true });
    }

    static async getProfilesByUser(userID: string): Promise<IProfileRoles[]> {
        return ProfileRolesModel.find({ userID });
    }

    static async getProfilesByGuild(guildID: string): Promise<IProfileRoles[]> {
        return ProfileRolesModel.find({ guildID });
    }

    async save(): Promise<IProfileRoles> {

        const profile = new ProfileRolesModel({
            userID: this.userID,
            guildID: this.guildID,
            roleIDs: this.roleIDs,
        });

        return profile.save();
    }

    static async updateProfile(userID: string, guildID: string, update: Partial<IProfileRoles>): Promise<IProfileRoles | null> {
        return ProfileRolesModel.findOneAndUpdate({ userID, guildID }, update, { new: true });
    }

    static async deleteProfile(userID: string, guildID: string): Promise<IProfileRoles | null> {
        return ProfileRolesModel.findOneAndDelete({ userID, guildID });
    }

    static async getRoleIDs(userID: string, guildID: string): Promise<string[]> {
        const profile = await this.getProfileById(userID, guildID);
        if (!profile) {
            throw new Error(`Profile not found for user ${userID} in guild ${guildID}`);
        }
        return profile.roleIDs;
    }

    static async setRoleIDs(userID: string, guildID: string, roleIDs: string[]): Promise<IProfileRoles | null> {
        return this.updateProfile(userID, guildID, { roleIDs });
    }

}

export default ProfileRoles;