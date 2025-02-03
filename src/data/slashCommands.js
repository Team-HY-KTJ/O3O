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
    },
    {
        name: 'oddeven',
        description: 'Play oddEven gamble!',
        name_localizations: {
            ko: '홀짝도박'
        },
        description_localizations: {
            ko: '홀짝 도박을 플레이합니다.'
        },
        options: [
            {
                name: 'bet_amount',
                type: 4,
                description: '배팅할 금액',
                required: true,
            },
        ],
    },
    {
        name: '홀짝도박',
        description: '홀짝 도박을 플레이합니다.',
        options: [
            {
                name: '배팅금액',
                type: 4,
                description: '배팅할 금액',
                required: true,
            },
        ],
    },
    {
        name: '시간예측도박',
        description: '마음속으로 초를 세세요! 지금이 제시된 시간같다면 버튼을 누르세요!',
        options: [
            {
                name: 'bet_amount',
                type: 4,
                description: '배팅할 금액',
                required: true,
            },
        ],
    }
];

export default commands;
