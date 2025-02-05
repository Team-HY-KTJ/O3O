import 'dotenv/config';
import { Client, GatewayIntentBits } from 'discord.js';

const TOKEN = process.env.DISCORD_BOT_TOKEN;
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});

client.once('ready', () => {
    console.log('Bot is online!');
});

client.on('messageCreate', async (message) => {
    if (message.author.bot) return;

    if (message.content === '!ping') message.channel.send('Pong!');
    if (message.content === '!hello')
        message.channel.send('Hello! I am a bot O3O-develop!');
});

client.login(TOKEN);
