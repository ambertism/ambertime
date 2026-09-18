const { SlashCommandBuilder, ApplicationIntegrationType, InteractionContextType } = require('discord.js');


const data = new SlashCommandBuilder()
	.setName('echo')
	.setDescription('Replies with your input!')
	.addStringOption((option) => option.setName('input').setDescription('The input to echo back').setRequired(true));
    
module.exports = {
	data,
	async execute(interaction) {
		
		const roundtripLatency = sent.createdTimestamp - interaction.createdTimestamp;
		const websocketPing = interaction.client.ws.ping;
		
		await interaction.reply({ content: interaction.options.getString('input') + ' \n -#' + roundtripLatency + 'ms (latency) | ' + websocketPing + 'ms (ping)' });


	},
};