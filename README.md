# O3O

a discord bot.

## Commit Template 적용 방법

프로젝트 루트 디렉토리에 `.gitmessage.txt` 파일을 생성하고, 아래 명령어를 실행하여 커밋 템플릿을 설정합니다:

```sh
git config commit.template .gitmessage.txt
```

## VSCode를 commit message editor로 설정하기기

다음 명령어를 실행하여 VSCode를 default commit message editor로 설정합니다:

```sh
git config --global core.editor "code --wait"
```

## 커밋 메시지 작성 과정

1. 커밋 명령어를 실행합니다:
    ```sh
    git commit
    ```
2. 메시지 작성이 완료되면 파일을 저장하고 VSCode 창을 닫습니다.  
   \# 주석과 가장 위 아래의 공백 열은 자동으로 제거되니 신경 쓰지 않아도 됩니다.
3. 창을 닫으면 커밋이 자동으로 완료됩니다.

## .env 파일 작성 방법

프로젝트를 클론한 후, `.env` 파일을 작성해야 합니다. `.env` 파일은 프로젝트의 루트 디렉토리에 위치해야 하며, 다음과 같은 형식을 따릅니다:

```plaintext
DISCORD_TOKEN=your_discord_token_here
```

토큰은 노션 회의록의 프로젝트 백로그 회의 2에 있으며, 두 줄 중 아래 것을 사용하여 테스트하면 됩니다.

##
