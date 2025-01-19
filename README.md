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
