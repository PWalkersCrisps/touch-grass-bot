import { ActionRowBuilder, ButtonBuilder, ButtonStyle, Channel, ColorResolvable, EmbedBuilder, Message, TextChannel } from 'discord.js';
import { TouchGrassClient } from '../../../structures/client';

module.exports = {
    name: 'suggestion',
    description: 'All sorts of suggestion commands',
    async execute({ interaction, guildData }: InteractionCommandArgs) {
        if (!guildData) return;
        if (!guildData.suggestionChannelID) return interaction.reply({ content: 'There isnt a suggestion channl set for this guild' });

        const parse: SuggestionParams = { interaction, guildData };
        const subcommand: string = interaction.options.getSubcommand();
        switch (subcommand) {
            case 'create':
                createSuggestion(parse);
                break;
            case 'accept':
                acceptSuggestion(parse);
                break;
            case 'decline':
                declineSuggestion(parse);
                break;
        }
    },
};

async function createSuggestion({ interaction, guildData }: SuggestionParams) {

    const suggestionTitle: string = interaction.options.getString('title') || `${interaction.user.username}'s Suggestion`;
    const suggestionDescription: string = interaction.option.getString('description');

    const createSuggestionEmbed: EmbedBuilder = new EmbedBuilder()
        .setTitle(suggestionTitle)
        .setDescription(suggestionDescription)
        .setFooter({ text: `Suggestion created by ${interaction.user.tag}` });

    const client: TouchGrassClient = interaction.client;
    const suggestionsChannel: Channel | undefined = client.channels.cache.get(guildData.suggestionChannelID);

    if (!suggestionsChannel || !suggestionsChannel.isTextBased()) return interaction.reply({ content: 'There isnt a suggestion text channel set for this guild' });

    const buttons = new ActionRowBuilder<ButtonBuilder>()
        .addComponents(
            new ButtonBuilder()
                .setCustomId('accept-suggestion')
                .setLabel('Accept')
                .setStyle(ButtonStyle.Success),
            new ButtonBuilder()
                .setCustomId('decline-suggestion')
                .setLabel('Decline')
                .setStyle(ButtonStyle.Danger),
        );


    (suggestionsChannel as TextChannel).send({ embeds: [createSuggestionEmbed], components: [buttons] }).then((suggestionMessage: Message) => {
        suggestionMessage.react('👍').then(() => suggestionMessage.react('👎'));
    });

    interaction.reply({ content: 'Suggestion created!', ephemeral: true });
}

export async function acceptSuggestion({ interaction, guildData }: SuggestionParams, reason?: string, messageID?: string) {

    messageID = interaction.options.getString('message-id');
    reason = interaction.options.getString('reason') || 'No reason provided';
    if (!messageID) return interaction.reply({ content: 'You must provide a message id' });

    const client: TouchGrassClient = interaction.client;
    const channel: Channel | undefined = client.channels.cache.get(guildData.suggestionChannelID);
    if (!channel || !channel.isTextBased()) return interaction.reply({ content: 'There isnt a suggestion text channel set for this guild', ephemeral: true });
    const message: Message = await (channel as TextChannel).messages.fetch(messageID);

    const description = message.embeds[0].description;
    const footer = message.embeds[0].footer;

    if (!message.embeds[0]) return message.channel.send('Invalid Suggestion');

    const newEmbed = new EmbedBuilder()
        .setTitle('Suggestion Approved')
        .setDescription(`${description}\n\n__**Approved by:**__ ${message.author.tag}\n__**Reason:**__ ${reason}`)
        .setFooter(footer)
        .setColor('Green' as ColorResolvable);

    message.edit({ embeds: [newEmbed] });
    message.reactions.removeAll();

    return interaction.reply({ content: `Successfully approved the suggestion in ${channel}!\n\n${message.url}`, ephemeral: true });
}

export async function declineSuggestion({ interaction, guildData }: SuggestionParams) {

    const messageID: string = interaction.options.getString('message-id');
    const reason: string = interaction.options.getString('reason') || 'No reason provided';
    if (!messageID) return interaction.reply({ content: 'You must provide a message id' });

    const client: TouchGrassClient = interaction.client;
    const channel: Channel | undefined = client.channels.cache.get(guildData.suggestionChannelID);
    if (!channel || !channel.isTextBased()) return interaction.reply({ content: 'There isnt a suggestion text channel set for this guild', ephemeral: true });
    const message: Message = await (channel as TextChannel).messages.fetch(messageID);

    const description = message.embeds[0].description;
    const footer = message.embeds[0].footer;

    if (!message.embeds[0]) return message.channel.send('Invalid Suggestion');

    const newEmbed = new EmbedBuilder()
        .setTitle('Suggestion Declined')
        .setDescription(`${description}\n\n__**Declined by:**__ ${message.author.tag}\n__**Reason:**__ ${reason}`)
        .setFooter(footer)
        .setColor('Red' as ColorResolvable);

    message.edit({ embeds: [newEmbed] });
    message.reactions.removeAll();

    return interaction.reply({ content: `Successfully declined the suggestion in ${channel}!\n\n${message.url}`, ephemeral: true });
}