const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('daily')
        .setDescription('Interact with the daily GUI'),
    async execute(interaction) {
        const row = new MessageActionRow
            .addComponents(
                new MessageButton()
                    .setCustomId('daily_challenge')
                    .setLabel('Daily Challenge')
                    .setStyle('PRIMARY'),
                new MessageButton()
                    .setCustomId('daily_reward')
                    .setLabel('Daily Reward')
                    .setStyle('SUCCESS')
            );

        await interaction.reply({ content: 'Select an option:', components: [row] });
    },
};
