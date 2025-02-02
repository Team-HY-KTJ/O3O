import { ActionRowBuilder, ButtonBuilder, EmbedBuilder } from '@discordjs/builders';
import balanceUpdate from '../utils/balanceUpdate.js';
import { ButtonStyle } from 'discord.js';

export default {
    name: '시간예측도박',
    description: '마음속으로 초를 세세요! 지금이 제시된 시간같다면 버튼을 누르세요!',
    option: [
        {
            name: '배팅금액',
            type: 4,
            description: '배팅할 금액',
            required: true,
        },
    ],

    execution: async (interaction) => {
        const betAmount = interaction.option.getInteger('배팅금액');

        if (betAmount <= 0) {
            await interaction.reply('배팅 금액은 0보다 커야 합니다.');
            return;
        }

        const randomTime = Math.floor(Math.random * 8) + 3;

        const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
            .setCustomId('now')
            .setLabel('지금!')
            .setStyle(ButtonStyle.Success);
        );
        
        const messageEmbed = new EmbedBuilder().setTitle('두구두구 시간예측')
        .setDescription(`**${randomTime}**초 후에 버튼을 눌러보세요!`);
                
        await interaction.reply({embeds: [messageEmbed], components: [row]});
    }
}