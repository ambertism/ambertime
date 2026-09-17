const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder().setName('user').setDescription('Provides information about the user.'),
    async execute(interaction) {
        // Fallback gracefully if someone runs it in DMs where member doesn't exist
        const joinedDate = interaction.member?.joinedAt ? interaction.member.joinedAt : 'Unknown (ran in DMs)';

        await interaction.reply(
            `This command was run by ${interaction.user.username}, who joined on ${joinedDate}.`,
        );
    },
};