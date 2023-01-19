import guildSchema from '../../schemas/guildSchema';

module.exports = {
    name: 'stickyroles',
    description: 'Toggles sticky roles.',
    async execute({ client, interaction, guildData }: any) {

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