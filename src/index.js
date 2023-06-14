const { Client, GatewayIntentBits, EmbedBuilder, PermissionsBitField, Permissions, MessageManager, Embed, Collection, ActivityType } = require(`discord.js`);
const fs = require('fs');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] }); 

client.commands = new Collection();

require('dotenv').config();

const functions = fs.readdirSync("./src/functions").filter(file => file.endsWith(".js"));
const eventFiles = fs.readdirSync("./src/events").filter(file => file.endsWith(".js"));
const commandFolders = fs.readdirSync("./src/commands");

function act(num){
    if(num == 1) client.user.setPresence({
            activities: [{ name: "your posture", type: ActivityType.Watching }],
            status: 'online'
    });
    if(num == 2) client.user.setPresence({
        activities: [{ name: "with yarn", type: ActivityType.Playing }],
        status: 'online'
    });
}

//runtime in seconds
let runTime = 0;
client.on('ready', () => {
    runTime = performance.now();
    for(i=1;i<2;i++){
        try{
            act(i);
        }
        catch{
            console.log('test case not there');
        }
    }
    console.log(`I'm online, my name is ${client.user.username}`);
    setInterval(() => {
        act(Math.floor(Math.random() * 2) + 1);
    }, 15000);
});

client.on('messageCreate', message => {
    if (message.author.bot) return;
    if (message.content.toLowerCase().includes('set status to')) {
        id = message.content.toLowerCase().replace('set status to ', '');
        act(parseInt(id));
    }
    if (message.content === '🤮') {
        for (i = 0; i < alcoholicCounter.length; i++) {
            if (alcoholicCounter[i][0] == message.author.username && alcoholicCounter[i][1] > 0) {
                message.reply(`Should I call a doctor?`);
                alcoholicCounter[i][1] = 0;
                break;
            } else {
                message.reply(`Had too much modly bread?`);
                break;
            }
        }
    }
    if (message.content === 'runtime') {
        if (Math.floor((performance.now() - runTime) / 1000) < 60)
            message.reply(`I've been working for ${Math.floor((performance.now() - runTime) / 1000)} seconds`);
        else if (Math.floor((performance.now() - runTime) / 1000 / 60) < 60)
            message.reply(`I've been working for ${Math.floor((performance.now() - runTime) / 1000 / 60)} minutes`);
        else if (Math.floor((performance.now() - runTime) / 1000 / 60 / 60) < 24)
            message.reply(`I've been working for ${Math.floor((performance.now() - runTime) / 1000 / 60 / 60)} hours`);
        else
            message.reply(`I've been working for ${Math.floor((performance.now() - runTime) / 1000 / 60 / 60 / 24)} days`);
    }
});



(async () => {
    for (file of functions) {
        require(`./functions/${file}`)(client);
    }
    client.handleEvents(eventFiles, "./src/events");
    client.handleCommands(commandFolders, "./src/commands");
    client.login(process.env.token)
    //client.on("ready", () => {});
    //make the bots status to listening to /help
})();

