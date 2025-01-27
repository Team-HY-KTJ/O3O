/* eslint-disable */
import commandListEmbed from '../utils/embeds.js';
import axios from 'axios';

export default {
    name: 'balance',
    description: 'Show balance for your account!',
    execute: async (interaction) => {
        try {
            const userId = interaction.user.id;
            const serverId = interaction.guild?.id || 'DM';
            const apiUrl = `http://localhost:3000/balance?userid=${userId}&serverid=${serverId}`;

            const { data } = await axios.get(apiUrl);

            if (data.newlyAdded) {
                await interaction.reply(
                    `새로운 계정을 만들었습니다! 초기 잔액은 ${
                        data.balance
                    }입니다. (User ID: ${data.userid})`
                );
            } else {
                await interaction.reply(
                    `현재 잔액은 ${data.balance}입니다. (User ID: ${data.userid})`
                );
            }
        } catch (error) {
            console.error('Balance command error:', error);
            await interaction.reply('잔액 조회 중 오류가 발생했습니다.');
        }
    },
};
