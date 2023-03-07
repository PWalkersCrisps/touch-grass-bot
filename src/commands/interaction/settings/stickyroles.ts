import guildSchema from '../../../schemas/guildSchema';
import { checkServerMod } from '../../../modules/checkPerms';

module.exports = {
    name: 'stickyroles',
    description: 'Toggles sticky roles.',
    async execute({ interaction, guildData }: InteractionCommandArgs) {
        if (!guildData) return interaction.reply({ content: 'There is no Guild Data', ephemeral: true });
        if (!interaction.member) return interaction.reply({ content: 'There is no member found', ephemeral: true });

        if (!checkServerMod(interaction, guildData)) return interaction.reply({ content: 'You do not have permission to use this command!', ephemeral: true });

        const guildID: string = interaction.guild.id;
        const stickyRoles: boolean = guildData.stickyRoles;

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