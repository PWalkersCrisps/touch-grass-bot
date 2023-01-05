import createDatabaseDocument = require('../modules/createDatabaseDocument');
module.exports = {
    name: 'guildCreate',
    async execute(guild: any) {
        const guildID = guild.id;
        const guildDocument = await createDatabaseDocument.createGuildDocument(guildID);
    },
};
