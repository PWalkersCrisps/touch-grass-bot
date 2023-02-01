import { DJSCommand } from '../../declarations';
import guildSchema from '../../schemas/guildSchema';
import { Client, Interaction, PermissionFlagsBits, EmbedBuilder, Role } from 'discord.js';

module.exports = {
    name: 'serverroles',
    description: '',
    async execute({ client, interaction, profileData, guildData }: DJSCommand) {
        if (!interaction.isCommand()) return;
        if (!interaction.guild?.available) return;
        if (!interaction.member) return interaction.reply({ content: 'There was an error fetching the member', ephemeral: true });
        if (!guildData) return interaction.reply({ content: 'There is no Guild Data found', ephemeral: true });

        if (!(interaction.member.roles.cache.some((roleCheck: any) => guildData.roles.modRoles.includes(roleCheck.id)) || interaction.member.permissions.has(PermissionFlagsBits.ManageGuild))) {
            return interaction.reply({ content: 'You do not have permission to use this command!', ephemeral: true });
        }

        const role: Role = interaction.options.getRole('role');
        const addremove: string = interaction.options.getString('addremove');
        const guildID: string = interaction.guild.id;

        const embed: EmbedBuilder = new EmbedBuilder()
            .setTitle('Server Roles')
            .setDescription('Here are the roles for this server')
            .addFields(
                { name: 'NSFW Ban Role', value: guildData.roles.nsfwBanRole ? `<@&${ guildData.roles.nsfwBanRole }>` : 'None' },
                { name: 'NSFW Role', value: guildData.roles.nsfwRole ? `<@&${ guildData.roles.nsfwRole }>` : 'None' },
                { name: 'Verified Role', value: guildData.roles.verifiedRole ? `<@&${ guildData.roles.verifiedRole }>` : 'None' },
                { name: 'Mod Roles', value: guildData.roles.modRoles.length > 0 ? guildData.roles.modRoles.map((modRole: any) => `<@&${ modRole }>`).join(', ') : 'None' },
            );

        const subCommand: string = interaction.options.getSubcommand();
        switch (subCommand) {
            case 'nsfwbanrole':
                if (addremove === 'add') {
                    await guildSchema.findOneAndUpdate({
                        guildID,
                    }, {
                        guildID,
                        'roles.nsfwBanRole': role.id,
                    }, {
                        upsert: true,
                    });
                    await interaction.reply({ content: `NSFW Ban role has been set to ${ role.name }`, ephemeral: true });
                }
                if (addremove === 'remove') {
                    await guildSchema.findOneAndUpdate({
                        guildID,
                    }, {
                        guildID,
                        'roles.nsfwBanRole': null,
                    }, {
                        upsert: true,
                    });
                    await interaction.reply({ content: 'NSFW Ban role has been removed', ephemeral: true });
                }
                break;
            case 'nsfwrole':
                if (addremove === 'add') {
                    await guildSchema.findOneAndUpdate({
                        guildID,
                    }, {
                        guildID,
                        'roles.nsfwRole': role.id,
                    }, {
                        upsert: true,
                    });
                    await interaction.reply({ content: `NSFW role has been set to ${ role.name }`, ephemeral: true });
                }
                if (addremove === 'remove') {
                    await guildSchema.findOneAndUpdate({
                        guildID,
                    }, {
                        guildID,
                        'roles.nsfwRole': null,
                    }, {
                        upsert: true,
                    });
                    await interaction.reply({ content: 'NSFW role has been removed', ephemeral: true });
                }
                break;
            case 'verifiedrole':
                if (addremove === 'add') {
                    await guildSchema.findOneAndUpdate({
                        guildID,
                    }, {
                        guildID,
                        'roles.verifiedRole': role.id,
                    }, {
                        upsert: true,
                    });
                    await interaction.reply({ content: `Verified role has been set to ${ role.name }`, ephemeral: true });
                }
                if (addremove === 'remove') {
                    await guildSchema.findOneAndUpdate({
                        guildID,
                    }, {
                        guildID,
                        'roles.verifiedRole': null,
                    }, {
                        upsert: true,
                    });
                    await interaction.reply({ content: 'Verified role has been removed', ephemeral: true });
                }
                break;
            case 'modroles':
                // This is an array of roles, work around that
                // if addremove is add, add the role to the array
                // if addremove is remove, remove the role from the array
                if (addremove === 'add') {
                    await guildSchema.findOneAndUpdate({
                        guildID,
                    }, {
                        $push: {
                            'roles.modRoles': role.id,
                        },
                    }, {
                        upsert: true,
                    });
                    await interaction.reply({ content: `Added ${ role.name } to the mod roles`, ephemeral: true });
                }
                if (addremove === 'remove') {
                    await guildSchema.findOneAndUpdate({
                        guildID,
                    }, {
                        $pull: {
                            'roles.modRoles': role.id,
                        },
                    }, {
                        upsert: true,
                    });
                    await interaction.reply({ content: `Removed ${ role.name } from the mod roles`, ephemeral: true });
                }
                break;
            case 'showroles':
                await interaction.reply({ embeds: [embed] });
                break;
        }
    },
};