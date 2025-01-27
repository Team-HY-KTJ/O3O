# Github actions 테스트를 위해 생성한 것이므로, 추후 살펴보고 수정해도 됨.

# 최신 LTS 버전인 Node.js 22 사용하는게 좋음. 굳이 Ubuntu로 하고 그 위에 Node.js 설치할 필요 없음.
FROM node:22.13.0

# 작업 디렉토리 설정
WORKDIR /app

# 환경 변수 전달 (Docker build 시 전달된 값)
ARG DISCORD_BOT_TOKEN
ARG APPLICATION_ID
ENV DISCORD_BOT_TOKEN=$DISCORD_BOT_TOKEN
ENV APPLICATION_ID=$APPLICATION_ID

# package.json 및 package-lock.json 복사 후 의존성 설치
COPY package*.json ./

# 의존성 설치
RUN npm install

# 봇 소스코드 복사
COPY . .

# 실행 디렉토리 이동 및 봇 실행
CMD ["node", "src/bot.js"]
