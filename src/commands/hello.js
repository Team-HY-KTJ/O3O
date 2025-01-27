/* eslint-disable */
import commandListEmbed from '../utils/embeds.js';

export default {
    name: 'hello',
    description: 'O3O Bot greets you and tells you the commands you can use!',
    execute: async (interaction) => {
        await interaction.reply('Hello! I am a bot O3O-develop!');
    },
};
