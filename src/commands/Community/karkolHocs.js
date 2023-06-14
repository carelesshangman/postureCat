const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('literallywhatevrtfuwant')
        .setDescription('Check your posture!')
        .addStringOption(option =>
            option.setName('time_interval')
                .setDescription('Set the time you want to be reminded to check your posture!')
                .setRequired(true)
        )
        .addIntegerOption(option =>
            option.setName('amount')
                .setDescription('Set the number of times to be reminded to check your posture!')
                .setRequired(true)
        ),
    async execute(interaction) {
        const timeInterval = interaction.options.getString('time_interval');
        const amount = interaction.options.getInteger('amount');

        if (timeInterval && amount) {
            const intervalInSeconds = parseInt(timeInterval);
            const totalDuration = intervalInSeconds * (amount + 1) * 1000;
            let loopCount = 0;

            await interaction.reply(`Checking your posture! Time Interval: ${timeInterval}, Amount: ${amount}`);

            const reminderMessages = [
                `Hey there, time to straighten up and check your posture, ${interaction.user.toString()}!`,
                `Meow! Don't forget to sit up straight, ${interaction.user.toString()}! 😺`,
                `Psst! It's time for a posture check, ${interaction.user.toString()}!`,
                `Attention, ${interaction.user.toString()}! Take a moment to correct your posture!`,
                `Reminder: Keep your back straight, ${interaction.user.toString()}!`
            ];

            const reminderTimer = setInterval(() => {
                loopCount++;

                // Perform the reminder logic here
                const randomIndex = Math.floor(Math.random() * reminderMessages.length);
                const reminderMessage = reminderMessages[randomIndex];
                interaction.channel.send(reminderMessage);

                if (loopCount === amount) {
                    clearInterval(reminderTimer);
                    console.log('Reminder timer completed.');
                }
            }, intervalInSeconds * 1000);

            setTimeout(() => {
                clearInterval(reminderTimer);
                console.log('Total duration completed.');
            }, totalDuration);
        }
    },
};
