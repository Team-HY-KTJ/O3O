/* eslint-disable prettier/prettier */
import 'dotenv/config';
import { Client, Embed, EmbedBuilder, GatewayIntentBits, MessageFlags } from 'discord.js';

const TOKEN = process.env.DISCORD_BOT_TOKEN;
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});

const userAccounts = {};

const commandListEmbed = new EmbedBuilder().setColor('#5762EB').setTitle('How can I help you?')
.addFields(
    {name: '/help', value: 'Show all commands of O3O bot!', inline : true},
    {name: '/hello', value: 'O3O Bot greets you and tells you the commands you can use!', inline : true},
    {name: '/balance', value: 'Show balance for your account!', inline : true},
);

// const commandList = 
// `
// How can I help you?
// \`/help : Show all commands of O3O bot!
// /hello : O3O Bot greets you and tells you the commands you can use!
// /balance : Show balance for your account! \`
// `

client.once('ready', () => {
    console.log('Bot is online!');
});

client.on('interactionCreate', async (interaction) => {
    if (interaction.isCommand()) {
        if (interaction.commandName === 'help') {
            await interaction.reply({embeds : [commandListEmbed]});          
        }
        else if (interaction.commandName === 'hello') {
            await interaction.reply('Hello! I am a bot O3O-develop!');
            await interaction.followUp({embeds : [commandListEmbed]});
        }
        else if (interaction.commandName === 'balance') {
            const serverNickName = interaction.member.nickname || interaction.user.globalName || interaction.user.username;
            if (userAccounts[interaction.user.id] === undefined) {
                userAccounts[interaction.user.id] = 10000;
                await interaction.reply(`
                    You opened your own account!!
\`${serverNickName}'s balance : ${userAccounts[interaction.user.id]}\`
`);
            }
            else {
                await interaction.reply(`\`${serverNickName}'s balance : ${userAccounts[interaction.user.id]}\``);
            }
        }
    }
})

// client.on('messageCreate', async (message) => {
//     if (message.author.bot) return;

//     if (message.content === '/help') {
//         message.channel.send({embeds : [commandListEmbed]});
//     }

//     if (message.content === '/hello') {
//         message.channel.send('Hello! I am a bot O3O-develop!');
//         message.channel.send({embeds : [commandListEmbed]});
//     }

//     if (message.content === '/balance') {
//         if (userAccounts[message.member.id] === undefined) {
//             message.channel.send('You opened your own account!!');
//             userAccounts[message.member.id] = 10000;
//         }
//         else {
//             message.channel.send(`\`${message.member.displayName}'s balance : ${userAccounts[message.member.id]}\``);
//         }
//     }
// });

client.login(TOKEN);
