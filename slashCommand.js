/* eslint-disable prettier/prettier */
import 'dotenv/config';
import { REST, Routes } from 'discord.js';

const botID = '1331669504354287687';
const serverID = '1246382849016332360';
const botToken = process.env.DISCORD_TOKEN;

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
];

const rest = new REST().setToken(botToken);
const slashRegister = async () => {
    try {
        await rest.put(Routes.applicationGuildCommands(botID, serverID), {
            body: commands,
        });
    } catch (error) {
        console.error(error);
    }
};
slashRegister();
