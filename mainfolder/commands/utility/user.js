const { SlashCommandBuilder, ApplicationIntegrationType, InteractionContextType } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder().setName('user').setDescription('Greets the user.'),
    async execute(interaction) {
        await interaction.reply(
            `Hello, ${interaction.user.username}! Have an amazing day/night!`,
        );
    },
};