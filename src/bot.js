const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});

client.once('ready', () => {
    console.log('봇이 준비되었습니다!');
});

client.on('messageCreate', (message) => {
    if (message.content === '안녕') {
        message.channel.send('안녕하세요!');
    }
});

client.login('YOUR_BOT_TOKEN');
