/* eslint-disable */
import 'dotenv/config';
import { Client, GatewayIntentBits } from 'discord.js';
import { fileURLToPath } from 'url';
import fs from 'fs';
import path from 'path';
import registerSlashCommands from './func/registerSlashCommands.js';

const TOKEN = process.env.DISCORD_BOT_TOKEN;
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});

const userAccounts = {};

// __dirname 설정
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 명령어 불러오기
const commands = new Map();
const commandFiles = fs
    .readdirSync(path.join(__dirname, 'commands'))
    .filter((file) => file.endsWith('.js'));

commandFiles.forEach(async (file) => {
    const filePath = `file://${path.join(__dirname, 'commands', file)}`;
    try {
        const command = await import(filePath);
        if (command.default && command.default.name) {
            commands.set(command.default.name, command.default);
        } else {
            console.error(
                `Command ${file} does not have a valid export or name property.`
            );
        }
    } catch (error) {
        console.error(`Failed to load command ${file}:`, error);
    }
});

client.once('ready', async () => {
    console.log('Bot is online!');
    const guilds = client.guilds.cache;
    await Promise.all(
        guilds.map(async (guild) => {
            await registerSlashCommands(guild.id, TOKEN);
        })
    );
});

client.on('guildCreate', async (guild) => {
    await registerSlashCommands(guild.id, TOKEN);
});

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return;

    const command = commands.get(interaction.commandName);
    if (!command) return;

    try {
        await command.execute(interaction, userAccounts);
    } catch (error) {
        console.error(error);
        await interaction.reply('There was an error executing this command!');
    }
});

client.login(TOKEN);
