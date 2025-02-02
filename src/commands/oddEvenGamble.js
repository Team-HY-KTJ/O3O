/* eslint-disable prettier/prettier */
import { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } from 'discord.js';
import balanceUpdate from '../utils/balanceUpdate.js';

export default {
    name: 'oddeven',
    description: 'Play oddEven gamble!',
    options: [
        {
            name: 'bet_amount',
            type: 4,
            description: '베팅할 금액',
            required: true,
        },
    ],
    execute: async (interaction) => {
        const betAmount = interaction.options.getInteger('bet_amount');

        if (betAmount <= 0) {
            await interaction.reply('배팅 금액은 0보다 커야합니다.');
            return;
        }

        const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId('odd')
                .setLabel('홀')
                .setStyle(ButtonStyle.Success),
            new ButtonBuilder()
                .setCustomId('even') 
                .setLabel('짝')
                .setStyle(ButtonStyle.Danger)
        );

        const isSameUser = (btnInteraction) => btnInteraction.user.id === interaction.user.id;
        await interaction.reply({
            content: `${betAmount}원을 걸었습니다! 홀(O) 또는 짝(X)을 선택하세요!`,
            components: [row],
        });
        const replyMessage = await interaction.fetchReply();

        const collector = replyMessage.createMessageComponentCollector({filter: isSameUser, time: 5000});

        collector.on('collect', async (btnInteraction) => {
            const userChoice = btnInteraction.customId; 
            const randomDice = Math.floor(Math.random() * 6) + 1;
            const result = (randomDice % 2 === 0) ? 'even' : 'odd';

            let message;
            let balanceChange;
            let embedColor;

            if (userChoice === result) {
                embedColor = 'Green';
                balanceChange = betAmount * 2;
                message = `축하합니다! 베팅 금액의 2배인 ${balanceChange}원을 획득하셨습니다! ㅊㅊ`;
            } else {
                embedColor = 'Red';
                balanceChange = -betAmount;
                message = `저런.. ${betAmount}원을 잃으셨습니다. 한번 더 ㄱ?`;
            }

            // await balanceUpdate(interaction.user.id,interaction.guildId,balanceChange,'홀짝 도박');
            const messageEmbed = new EmbedBuilder().setColor(embedColor).setTitle(`주사위 결과: **${randomDice}**`)
            .setDescription(message)
            // .setFooter({text: , iconURL: interaction.user.displayAvatarURL()})   추후 사용자의 잔액 표시
            await btnInteraction.reply({embeds : [messageEmbed]});
            
            collector.stop();
        });

        collector.on('end', async (collected) => {
            if (collected.size === 0) {
                await interaction.followUp('시간 초과. 다시 시도해주세요.');
            }
        });
    },
};