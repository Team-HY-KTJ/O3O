/* commands/balance.js */
/* eslint-disable */
import axios from 'axios';
import getBalance from '../utils/getBalance.js';

// 백엔드 랭킹 조회용 함수
async function getRanking(guildId, scope = 'top', limit = 10, page = 1) {
    try {
        // GET /balance/ranking?guildId=xxx&scope=top|all&limit=xx&page=xx
        const response = await axios.get(
            'http://o3o-backend:3000/balance/ranking',
            {
                params: {
                    guildId,
                    scope,
                    limit,
                    page,
                },
                timeout: 5000,
            }
        );
        return response.data;
    } catch (error) {
        console.error('getRanking error:', error.message || error);
        return { error: '랭킹 조회 중 오류가 발생했습니다.' };
    }
}

export default {
    name: 'balance',
    async execute(interaction) {
        const subcommand = interaction.options.getSubcommand();
        const guildId = interaction.guild?.id || 'DM';

        try {
            // /balance user @멘션
            if (subcommand === 'user') {
                const targetUser = interaction.options.getUser('target');
                const data = await getBalance(targetUser.id, guildId);

                // getBalance는 ../utils/getBalance.js에 존재
                if (data.error) {
                    return interaction.reply(`오류: ${data.error}`);
                }

                if (data.newlyAdded) {
                    return interaction.reply(
                        `<@${targetUser.id}>님의 계좌가 없어 새로 생성했습니다!\n초기 잔액: ${data.balance}`
                    );
                } else {
                    return interaction.reply(
                        `<@${targetUser.id}>님의 현재 잔액: ${data.balance}`
                    );
                }

                // /balance ranking [limit]
            } else if (subcommand === 'ranking') {
                const limit = interaction.options.getInteger('limit') || 10;

                // scope=top 모드로 상위 n명 조회
                const data = await getRanking(guildId, 'top', limit);

                if (data.error) {
                    return interaction.reply(`오류: ${data.error}`);
                }

                const rankingList = data.ranking;
                if (!rankingList || rankingList.length === 0) {
                    return interaction.reply('랭킹 정보가 없습니다!');
                }

                // 메시지 구성
                let replyMsg = `**상위 ${limit}명 랭킹**\n`;
                rankingList.forEach((user, index) => {
                    replyMsg += `${index + 1}위 <@${user.userId}> : ${user.balance}\n`;
                });
                replyMsg += `\n(총 ${data.totalCount}명 중 상위 ${rankingList.length}명)`;

                return interaction.reply(replyMsg);

                // /balance all
            } else if (subcommand === 'all') {
                // 버튼을 통한 페이지 전환은 추후 구현 예정

                const page = interaction.options.getInteger('page') || 1;
                const limit = interaction.options.getInteger('limit') || 10;

                // scope=all 모드로 조회
                const data = await getRanking(guildId, 'all', limit, page);

                if (data.error) {
                    return interaction.reply(`오류: ${data.error}`);
                }

                const rankingList = data.ranking;
                if (!rankingList || rankingList.length === 0) {
                    return interaction.reply('전체 랭킹 정보가 없습니다!');
                }

                let replyMsg = `**전체 유저 랭킹** (페이지 ${data.page}/${data.totalPage})\n`;
                rankingList.forEach((user, index) => {
                    const actualRank = (page - 1) * limit + index + 1;
                    replyMsg += `${actualRank}위 <@${user.userId}> : ${user.balance}\n`;
                });
                replyMsg += `\n총 ${data.totalCount}명 중 ${rankingList.length}명 표시`;

                return interaction.reply(replyMsg);
            }
        } catch (error) {
            console.error('Balance command error:', error.message || error);
            return interaction.reply('잔액/랭킹 조회 중 오류가 발생했습니다.');
        }
    },
};
