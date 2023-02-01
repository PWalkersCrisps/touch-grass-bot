import guildSchema from '../../schemas/guildSchema';
import { Client, Interaction, PermissionFlagsBits } from 'discord.js';
import { DJSCommand } from '../../declarations';

module.exports = {
    name: 'stickyroles',
    description: 'Toggles sticky roles.',
    async execute({ client, interaction, profileData, guildData }: DJSCommand) {
        if (!interaction.isCommand()) return;
        if (!interaction.guild?.available) return;
        if (!guildData) return interaction.reply({ content: 'There is no Guild Data', ephemeral: true });
        if (!interaction.member) return interaction.reply({ content: 'There is no member found', ephemeral: true });

        if (!(interaction.member.roles.cache.some((role: any) => guildData.roles.modRoles.includes(role.id)) || interaction.member.permissions.has(PermissionFlagsBits.ManageGuild))) {
            return interaction.reply({ content: 'You do not have permission to use this command!', ephemeral: true });
        }

        const guildID = interaction.guild.id;
        const stickyRoles = guildData.stickyRoles;

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