/* ../data/slashCommands.js */
const commands = [
    {
        name: 'help',
        description: 'Show all commands of O3O bot!',
    },
    {
        name: 'hello',
        description:
            'O3O Bot greets you and tells you the commands you can use!',
    },
    {
        name: 'balance',
        description: 'Show balance for your account!',
        options: [
            {
                type: 1, // Subcommand
                name: 'user',
                description: '특정 유저의 잔고를 확인합니다.',
                options: [
                    {
                        type: 6, // User mention
                        name: 'target',
                        description: '잔고를 확인할 대상 유저',
                        required: true,
                    },
                ],
            },
            {
                type: 1, // Subcommand
                name: 'ranking',
                description: '상위 랭킹을 확인합니다.',
                options: [
                    {
                        type: 4, // Integer
                        name: 'limit',
                        description: '상위 몇 명을 볼지 (기본값 10)',
                        required: false,
                    },
                ],
            },
            {
                type: 1, // Subcommand
                name: 'all',
                description: '전체 유저 랭킹을 확인합니다.',
            },
        ],
    },
    {
        name: 'oddeven',
        description: 'Play oddEven gamble!',
        name_localizations: {
            ko: '홀짝도박',
        },
        description_localizations: {
            ko: '홀짝 도박을 플레이합니다.',
        },
        options: [
            {
                name: 'bet_amount',
                name_localizations: {
                    ko: '배팅금액',
                },
                type: 4,
                description: '배팅할 금액',
                required: true,
            },
        ],
    },
    {
        name: '시간예측도박',
        description:
            '마음속으로 초를 세세요! 지금이 제시된 시간같다면 버튼을 누르세요!',
        options: [
            {
                name: 'bet_amount',
                name_localizations: {
                    ko: '배팅금액',
                },
                type: 4,
                description: '배팅할 금액',
                required: true,
            },
        ],
    },
];

export default commands;
