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
        options: [
            {
                name: 'bet_amount',
                type: 4,
                description: '베팅할 금액',
                required: true,
            },
        ],
    },
];

export default commands;
