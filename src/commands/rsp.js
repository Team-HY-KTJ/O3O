/* eslint-disable */
import commandListEmbed from '../utils/embeds.js';
import { ActionRowBuilder, ButtonBuilder, ButtonBuilder } from 'discord.js';
import updateBalance from '../utils/balanceUpdate.js';

const API_BASE_URL = 'http://o3o-backend:3000';

export default {
    name: 'rsp',
    description: 'O3O bot plays a dice rock-scissora-paper game with you.',
    options: [
        {
            name: 'bet_amount',
            type: 4,
            description: 'Enter the amount you want to bet.(Minimum 1,000)',
            required: true,
        },
    ],
    execute: async (interaction) => {
        const choices = ['바위', '가위', '보자기']
        const botChoice = choices[Math.floor(Math.random() * choices.length)];
        const userId = interaction.user.id;
        const serverId = interaction.guild?.id || 'DM';
        const betAmount = interaction.options.getInteger('bet');

        const userBalance = await updateBalance(userId, serverId, betAmount, 'rspBetting');
        if (userBalance.error) {
            return interaction.reply(`${userBalance.error}`);
        }

        const buttons = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustom('rock')
                    .setLabel('바위🪨')
                    .setStyle(ButtonStyle.Secondary()),
                new ButtonBuilder()
                    .setCustom('scissors')
                    .setLabel('가위✂️')
                    .setStyle(ButtonStyle.Secondary()),
                new ButtonBuilder()
                    .setCustom('paper')
                    .setLabel('보자기기📄')
                    .setStyle(ButtonStyle.Secondary()),
            );
        await interaction.reply({
            content: '가위바위보 시작! 버튼을 클릭해주세요.',
            components: [buttons],
        });

        const filter = i => i.user.id === userId;
        const collector = interaction.channel.createMessageComponentCollector({ filter, time: 15000 });

        collector.on('collect', async i => {
            let userChoice;
            if (i.customId === 'rock') userChoice = '바위';
            else if (i.customId === 'scissors') userChoice = '가위';
            else if (i.customId === 'paper') userChoice = '보자기';

            let gameResult, balanceChange = 0;
            if (userChoice === botChoice) {
                gameResult = `무승부! ${betAmount} 이 반환되었습니다.`;
                balanceChange = betAmount;
            } else if (
                (userChoice === '가위' && botChoice === '보자기') ||
                (userChoice === '바위' && botChoice === '가위') ||
                (userChoice === '보자기' && botChoice === '바위')
            ) {
                gameResult = `축하합니다! 당신이 이겼습니다! ${betAmount} x2 획득! `;
                balanceChange = betAmount * 2;
            } else {
                gameResult = `당신이 졌습니다.. ${betAmount} 이 차감되었습니다..`;
            }

            if (balanceChange !== 0) {
                await updateBalance(userId, serverId, balanceChange, 'rspResult');
            }

            await i.update({
                content: `👤 당신: ${userChoice}\n🤖 봇: ${botChoice}\n\n**${gameResult}**`,
                components: [],
            });
        }); 

        collector.on('end', collected => {
            if (collected.size === 0) {
                interection.editReply({ content: '⏳ 시간이 초과되었습니다. 다시 시도해주세요!', components: [] });
                updateBalance(userId, serverId, betAmount, 'rspTimeOut');
            }
        });
    },
};
