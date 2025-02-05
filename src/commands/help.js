/* eslint-disable */
import commandListEmbed from '../utils/embeds.js';

export default {
    name: 'help',
    description: 'Show all commands of O3O bot!',
    execute: async (interaction) => {
        await interaction.reply({ embeds: [commandListEmbed] });
    },
};
