const { SlashCommandBuilder } = require('discord.js');

// for this, i have everything required so if the user wants shortdate, they can fill the rest with random shit and not have to worry about it.
// unfortunately im not very good at js because this is my first time, but if anyone would like to fork this project, they are free to go ahead. i have my config ignored by git, so all that you would need to put in there is your (example) clientId, (example) guildId, and bot token.
module.exports = {
    data: new SlashCommandBuilder()
        .setName('time')
        .setDescription('converts local time to unix/discord timestamp')
        .addStringOption((option)=> option.setName('howthisworks').setDescription('if you want one part, fill the rest with 1jan1970(corresponding) if you understand type \" ok\" ').setRequired(true))
        .addIntegerOption((option) => option.setName('day').setDescription('The day of the month (1-31)').setRequired(true))
        .addIntegerOption((option) => option.setName('month').setDescription('The month (1-12)').setRequired(true))
        .addIntegerOption((option) => option.setName('year').setDescription('The year (e.g., 2023)').setRequired(true))
        .addIntegerOption((option) => option.setName('hour').setDescription('The hour (0-23)').setRequired(true))
        .addIntegerOption((option) => option.setName('minute').setDescription('The minute (0-59)').setRequired(true))
        .addIntegerOption((option) => option.setName('second').setDescription('The second (0-59)').setRequired(true))
        .addIntegerOption((option) => option.setName('timezone').setDescription('The timezone (e.g., 0, -5, +2, etc.)').setRequired(true))
        .addStringOption((option) => option.setName('formatting').setDescription('the formatting style (shorttime, longtime, shortdate, longdate, shortdatetime, longdatetime)').setRequired(true)),

    async execute(interaction) {
        // discord slash commands don't give us bare variables in scope, so we pull everything out of the interaction first
        const howthisworks = interaction.options.getString('howthisworks');
        const day = interaction.options.getInteger('day');
        const month = interaction.options.getInteger('month');
        const year = interaction.options.getInteger('year');
        const hour = interaction.options.getInteger('hour');
        const minute = interaction.options.getInteger('minute');
        const second = interaction.options.getInteger('second');
        const timezone = interaction.options.getInteger('timezone');
        const formatting = interaction.options.getString('formatting');

        // to help the user understand how this works, we will have a required option that explains how to use the command. if they dont type "ok" in that option, we will not proceed with the command.
        if (howthisworks != 'ok') {
            return interaction.reply('Please read the instructions in the "howthisworks" option and type "ok" to proceed.');
        }

        // this is what happens if we have a missing input, which just doesnt work with the way discord slash commands work, so we just make them all optional and then check for missing inputs in the execute function
        if (formatting != 'shorttime' && formatting != 'longtime' && formatting != 'shortdate' && formatting != 'longdate' && formatting != 'shortdatetime' && formatting != 'longdatetime') {
            return interaction.reply('Invalid formatting style. Please choose from: shorttime, longtime, shortdate, longdate, shortdatetime, longdatetime.');
        }
        if (day && (day < 1 || day > 31)) {
            return interaction.reply('Invalid day. Please provide a day between 1 and 31.');
        }
        if (month && (month < 1 || month > 12)) {
            return interaction.reply('Invalid month. Please provide a month between 1 and 12.');
        }
        if (year && (year < 1970 || year > 3000)) {
            return interaction.reply('Invalid year. Please provide a year between 1970 and 3000.');
        }

        // now we're going to adjust the timestamp to milliseconds
        const utcMilliseconds = Date.UTC(year, month - 1, day, hour, minute, second);
        const adjustedMilliseconds = utcMilliseconds - (timezone * 3600 * 1000);
        const unixTimestamp = Math.floor(adjustedMilliseconds / 1000);

        // map the text formatting choice to discord's timestamp letters
        const formatMap = {
            shorttime: 't',
            longtime: 'T',
            shortdate: 'd',
            longdate: 'D',
            shortdatetime: 'f',
            longdatetime: 'F'
        };

        const discordFlag = formatMap[formatting];

        // output it back to the user
        await interaction.reply(`<t:${unixTimestamp}:${discordFlag}> \`(<t:${unixTimestamp}:${discordFlag}>)\``);
    }
};