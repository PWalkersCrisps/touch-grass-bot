import profileSchema from '../../../schemas/profileSchema';
import { GuildMember } from 'discord.js';
import { checkServerModMessage } from '../../../modules/checkPerms';

module.exports = {
    name: 'unverify',
    description: 'Remove the verify status from a user in the database.',
    async execute({ message, guildData }: MessageCommandArgs) {
        if (!guildData) return message.reply({ content: 'There is no Guild Data', ephemeral: true });

        const member: GuildMember | null = message.mentions.users.first();
        if (!member) return message.reply({ content: 'You need to mention a user', ephemeral: true });
        if (!guildData.trusted) return message.reply({ content: 'You need to be a trusted user to use this command', ephemeral: true });
        if (!checkServerModMessage(message, guildData)) return message.reply({ content: 'You do not have permission to use this command!', ephemeral: true });

        if (message.guild.roles.cache.has(guildData.roles?.verifiedRole)) await member.roles.remove(guildData.roles?.verifiedRole);

        await profileSchema.findOneAndUpdate({
            userID: member.id,
        }, {
            verify: {
                verified: false,
            },
        }, {
            upsert: true,
        });

        await message.reply({ content: `Removed the verified status from ${member.user.tag}`, ephemeral: true });
    },
};