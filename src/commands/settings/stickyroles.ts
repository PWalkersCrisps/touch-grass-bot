import guildSchema from '../../schemas/guildSchema';
import { PermissionFlagsBits } from 'discord.js';

module.exports = {
    name: 'stickyroles',
    description: 'Toggles sticky roles.',
    async execute({ client, interaction, guildData }: any) {

        const guildID = interaction.guild.id;
        const stickyRoles = guildData.stickyRoles;

        if (!(interaction.member.roles.cache.some((role: any) => guildData.roles.modRoles.includes(role.id)) || interaction.member.permissions.has(PermissionFlagsBits.ManageGuild))) {
            return interaction.reply({ content: 'You do not have permission to use this command!', ephemeral: true });
        }
        await guildSchema.findOneAndUpdate({
            guildID,
        }, {
            guildID,
            stickyRoles: !stickyRoles,
        }, {
            upsert: true,
        });

        await interaction.reply({ content: `Sticky roles have been set to ${ !stickyRoles }`, ephemeral: true });
    },
};