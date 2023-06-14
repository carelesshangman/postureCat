const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('cattack')
        .setDescription('Threatens the user who deserves it.')
        .addStringOption(option =>
            option.setName('user')
                .setDescription('Set the user who needs to be mlemed.')
                .setRequired(true)
        ),
    async execute(interaction) {
        await interaction.deferReply();

        // Replace "USER_ID" with the actual user ID you want to send the message to
        const usern = interaction.options.getString('user');
        userId = '314036523945295872';
        if(usern.localeCompare("Jaka") == 0) {
            userId = '278956433532518400';
        }
        else if(usern.localeCompare("Brita") == 0) {
            userId = '314036523945295872';
        }

        

        try {
            const user = await interaction.client.users.fetch(userId);
            client.user.setPresence({
                activities: [{ name: "with knif", type: ActivityType.Playing }],
                status: 'online'
        })
            await user.send("I'm coming for your bones >:3 :knife:");
        } catch (error) {
            console.error('Failed to send DM:', error);
            await interaction.followUp({ content: 'Failed to send DM.', ephemeral: true });
        }
    }
};