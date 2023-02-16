import { EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder, AnyComponentBuilder, APIActionRowComponent, APIMessageActionRowComponent } from 'discord.js';
import { DJSCommand } from '../../declarations';

module.exports = {
    name: 'about',
    description: 'Shows information about the bot',
    async execute({ client, interaction, profileData, guildData }: DJSCommand) {
        if (!interaction.isCommand()) return;
        if (!interaction.guild?.available) return;
        if (!interaction.inCachedGuild()) return;
        if (!interaction.isChatInputCommand()) return;

        if (!client.user) return interaction.reply({ content: 'There is no client user', ephemeral: true });

        const aboutEmbed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle('About')
            .setThumbnail(client.user.displayAvatarURL())
            .addFields(
                { name: 'Name', value: `${client.user.username}`, inline: true },
                { name: 'ID', value: `${client.user.id}`, inline: true },
                { name: 'What do I do?', value: 'I am a bot that helps you manage your NSFW server. I have features such as verification, nsfw banning, and more. You can see all of my commands by using the /help command.' },
                { name: 'How do I use this bot?', value: 'You can use this bot by inviting it to your server. You can do this by clicking the invite button below. If you need help with the bot, you can join the support server by clicking the support server button below.' },
                { name: 'Why do I keep getting \'This guild is not trusted!\'?', value: 'This is because your guild hasn\'t been trusted by a bot manager, you are still able to receive status updates about users being NSFW Banned or Verified' },
                { name: 'How does NSFW ban and Verification work?', value: 'NSFW ban and Verification are both executed by the guild moderators, when a member is NSFW banned or verified, this status is sent to all of the other servers that have this bot invited' }
            )
            .setTimestamp();

        const aboutActions: any = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setStyle(ButtonStyle.Link)
                    .setLabel('Invite')
                    .setURL('https://discord.com/api/oauth2/authorize?client_id=1058024628871757845&permissions=275146655744&scope=bot%20applications.commands'),
                new ButtonBuilder()
                    .setStyle(ButtonStyle.Link)
                    .setLabel('Support Server')
                    .setURL('https://discord.gg/2Z3Z4Z2'),
            ) ;

        interaction.reply({ embeds: [aboutEmbed], components: [aboutActions] });
    },
};
