/* eslint-disable prettier/prettier */
import { ActionRowBuilder, ButtonBuilder, EmbedBuilder } from '@discordjs/builders';
import balanceUpdate from '../utils/balanceUpdate.js';
import getBalance from '../utils/getBalance.js';
import { ButtonStyle } from 'discord.js';

export default {
    name: '시간예측도박',
    description: '마음속으로 초를 세세요! 지금이 제시된 시간같다면 버튼을 누르세요!',
    options: [
        {
            name: 'bet_amount',
            type: 4,
            description: '배팅할 금액',
            required: true,
        },
    ],

    execute: async (interaction) => {
        const betAmount = interaction.options.getInteger('bet_amount');

        if (betAmount <= 0) {
            await interaction.reply('배팅 금액은 0보다 커야 합니다.');
            return;
        }
        if (getBalance((interaction.user.id,interaction.guildId) < betAmount)) {
            await interaction.reply('잔액이 부족해요.. ㅠㅠ')
            return;
        }

        const randomTime = Math.floor(Math.random * 8) + 3;

        const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
            .setCustomId('now')
            .setLabel('지금!')
            .setStyle(ButtonStyle.Success)
        );
        
        const messageEmbed = new EmbedBuilder().setTitle('두구두구 시간예측')
        .setDescription(`**${randomTime}**초 후에 버튼을 눌러보세요!`);

        const startTime = Date.now();
                
        await interaction.reply({embeds: [messageEmbed], components: [row]});
        const replyMessage = await interaction.fetchReply();

        const isSameUser = (btnInteraction) => btnInteraction.user.id === interaction.user.id;
        const collector = replyMessage.createMessageComponentCollector({filter: isSameUser,time: (randomTime + 3) * 1000});

        collector.on('collect', async (btnInteraction) => {
            const timeResult = (Date.now()-startTime)/1000;
            const difference = Math.abs(timeResult - randomTime);

            let message;
            let balanceChange;
            let embedColor;

            if (difference <= 0.5) {
                embedColor = 'Green';
                balanceChange = betAmount * 2;
                message = `성공! 정확한 시간: **${timeResult.toFixed(2)}초** (차이: ${difference.toFixed(2)}초)\n 배팅 금액의 2배인 ${balanceChange}원을 획득하셨습니다!`;
            } else {
                embedColor = 'Red';
                balanceChange = -betAmount;
                message = `실패... 실제 시간: **${timeResult.toFixed(2)}초** (차이: ${difference.toFixed(2)}초)\n ${betAmount}원을 잃으셨습니다.`;
            }

            await balanceUpdate(interaction.user.id, interaction.guildId, balanceChange, '시간 예측 도박');

            const resultEmbed = new EmbedBuilder()
            .setColor(embedColor)
            .setTitle(`결과: ${timeResult.toFixed(2)}초`)
            .setDescription(message);

            await interaction.update({embeds: [resultEmbed]});

            collector.stop();
        })

        collector.on('end', async (collected) => {
            if (collected.size === 0) {
                await interaction.followUp('시간 초과. 다시 시도해주세요.');
            }
        })
    }
}