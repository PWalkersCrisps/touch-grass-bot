import createDatabaseDocument = require('../modules/createDatabaseDocument');

module.exports = {
    name: 'interactionCreate',
    async execute(interaction: any) {
        try {
            const client = interaction.client;
            if (interaction.isCommand()) {
                const command: any = client.commands.get(interaction.commandName); // Get the command from the client's commands collection

                if (!command) return; // If the command is not found, return

                const profileData: ProfileDocument = await createDatabaseDocument.createProfileDocument(interaction.user.id);
                const guildData: GuildDocument = await createDatabaseDocument.createGuildDocument(interaction.guild.id);

                try {
                    await command.execute({ client, interaction, profileData, guildData }); // Execute the command
                }
                catch (error) {
                    console.error(error); // If there is an error, log it
                    await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
                }
            }
        }
        catch (error) {
            console.error(error);
        }
    },
};