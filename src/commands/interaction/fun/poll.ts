import { ColorResolvable, EmbedBuilder, Message } from 'discord.js';

module.exports = {
    name: 'poll',
    description: 'Creates a poll',
    async execute({ interaction }: InteractionCommandArgs) {
        const question: string = interaction.options.getString('question');
        const option1: string = interaction.options.getString('option1');
        const option2: string = interaction.options.getString('option2');
        const option3: string = interaction.options.getString('option3');
        const option4: string = interaction.options.getString('option4');
        const option5: string = interaction.options.getString('option5');
        const option6: string = interaction.options.getString('option6');
        const option7: string = interaction.options.getString('option7');
        const option8: string = interaction.options.getString('option8');
        const option9: string = interaction.options.getString('option9');
        const option10: string = interaction.options.getString('option10');

        const options: string[] = [option1, option2];

        if (option3) options.push(option3);
        if (option4) options.push(option4);
        if (option5) options.push(option5);
        if (option6) options.push(option6);
        if (option7) options.push(option7);
        if (option8) options.push(option8);
        if (option9) options.push(option9);
        if (option10) options.push(option10);

        const optionsEmotes: string[] = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '🔟'];

        const description: string = options.map((option, index) => `${optionsEmotes[index]} ${option}`).join('\n');

        const pollEmbed: EmbedBuilder = new EmbedBuilder()
            .setTitle(question)
            .setDescription(description)
            .setColor('Random' as ColorResolvable)
            .setTimestamp()
            .setFooter({ text: `Poll created by ${interaction.member.user.tag}`, iconURL: interaction.member.user.avatarURL() });


        interaction.reply({ embeds: [pollEmbed], fetchReply: true }).then(async (msg: Message) => {
            await msg.react('1️⃣')
                .then(async () => await msg.react('2️⃣'))
                .then(async () => { if (option3) await msg.react('3️⃣'); })
                .then(async () => { if (option4) await msg.react('4️⃣'); })
                .then(async () => { if (option5) await msg.react('5️⃣'); })
                .then(async () => { if (option6) await msg.react('6️⃣'); })
                .then(async () => { if (option7) await msg.react('7️⃣'); })
                .then(async () => { if (option8) await msg.react('8️⃣'); })
                .then(async () => { if (option9) await msg.react('9️⃣'); })
                .then(async () => { if (option10) await msg.react('🔟'); });
        });

    },
};