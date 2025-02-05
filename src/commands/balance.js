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
            const apiUrl = 'http://o3o-backend:3000/balance';

            // Axios 요청 시 params 객체를 사용해 가독성 향상 및 오류 방지
            const { data } = await axios.get(apiUrl, {
                params: {
                    userid: userId,
                    serverid: serverId,
                },
                timeout: 5000, // 요청 제한 시간 설정 (5초)
            });

            // 응답 결과에 따른 처리
            const userMention = `<@${interaction.user.id}>`;
            const responseMessage = data.newlyAdded
                ? `${userMention}님의 계좌가 존재하지 않아, 방금 생성했습니다! 
                \`${userMention}님의 초기 잔액은 ${data.balance}입니다.\``
                : `\`${userMention}님의 현재 잔액은 ${data.balance}입니다.\``;

            await interaction.reply(responseMessage);
        } catch (error) {
            console.error('Balance command error:', error.message || error);

            // 오류의 유형에 따라 사용자에게 적절한 응답 제공
            let errorMessage = '잔액 조회 중 오류가 발생했습니다.';
            if (error.code === 'ECONNREFUSED') {
                errorMessage =
                    '서버에 연결할 수 없습니다. 나중에 다시 시도해 주세요.';
            } else if (error.response) {
                errorMessage = `서버 오류: ${error.response.status} ${error.response.statusText}`;
            } else if (error.request) {
                errorMessage = '서버로부터 응답이 없습니다.';
            }

            await interaction.reply(errorMessage);
        }
    },
};
