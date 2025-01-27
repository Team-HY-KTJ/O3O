import { EmbedBuilder } from 'discord.js';

const commandListEmbed = new EmbedBuilder()
    .setColor('#5762EB')
    .setTitle('How can I help you?')
    .addFields(
        { name: '/help', value: 'Show all commands of O3O bot!', inline: true },
        {
            name: '/hello',
            value: 'O3O Bot greets you and tells you the commands you can use!',
            inline: true,
        },
        {
            name: '/balance',
            value: 'Show balance for your account!',
            inline: true,
        }
    );

export default commandListEmbed;
