import axios from 'axios';

const API_BASE_URL = 'http://o3o-backend:3000';

/**
 * 잔고 수정 API 요청 함수
 *
 * @param {number} userid - 사용자 ID
 * @param {number} serverid - 서버 ID
 * @param {number} amount - 수정할 금액 (출금은 음수, 입금은 양수)
 * @param {string} reason - 수정 사유 (로그 기록용. 걍 비워도 됨)
 * @returns {Promise<Object>} - API 응답 데이터
 *
 * 비동기 처리 해줘야 되고, 파일 위치 잘 잡아주기.
}

 */
async function updateBalance(userid, serverid, amount, reason) {
    try {
        const response = await axios.post(`${API_BASE_URL}/balance/update`, {
            userid,
            serverid,
            amount,
            reason,
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

export default updateBalance;
