// balance 확인용 모듈화 (/balance 명령어 외 사용 목적)
import axios from 'axios';

const API_BASE_URL = 'http://o3o-backend:3000';

/**
 * 잔고 확인인 API 요청 함수
 *
 * @param {number} userid - 사용자 ID
 * @param {number} serverid - 서버 ID
 *
 * @returns {Promise<Object>} - API 응답 데이터
 *   {
 *     userid: number,
 *     balance: number,
 *     newlyAdded: boolean // 새로 계좌를 생성했다면 true, 이미 있었다면 false
 *   }
 *
 */
async function getBalance(userid, serverid) {
    try {
        const response = await axios.get(`${API_BASE_URL}/balance`, {
            userid,
            serverid,
        });
        return response.data;
    } catch (error) {
        if (error.response) {
            // 서버가 응답을 반환한 경우
            return { error: error.response.data.error };
        }
        // 서버가 응답을 반환하지 않은 경우
        console.error('API 요청 오류:', error);
        return { error: '서버 오류 : API 요청 실패' };
    }
}

export default getBalance;
