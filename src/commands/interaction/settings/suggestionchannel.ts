import { Channel } from 'discord.js';
import { checkServerMod } from '../../../modules/checkPerms';
import guildSchema from '../../../schemas/guildSchema';

module.exports = {
    name: 'suggestionchannel',
    description: 'Set suggestion channel in guild.',
    async execute({ interaction, guildData }: InteractionCommandArgs) {
        if (!guildData) return interaction.reply({ content: 'There is no Guild Data', ephemeral: true });
        if (!checkServerMod(interaction, guildData)) return interaction.reply({ content: 'You do not have permission to use this command!', ephemeral: true });

        const channel: Channel = interaction.options.getChannel('channel');

        if (!channel || !channel.isTextBased()) return interaction.reply({ content: 'You must provide a text channel', ephemeral: true });

        const guildID: string = interaction.guild.id;

        await guildSchema.findOneAndUpdate({
            guildID,
        }, {
            suggestionChannelID: channel.id,
        }, {
            upsert: true,
        });

        await interaction.reply({ content: `Suggestion channel has been set to ${ channel }`, ephemeral: true });
    },
};