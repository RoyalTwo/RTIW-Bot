import * as dotenv from 'dotenv';
dotenv.config();
import { Client, Collection, GatewayIntentBits } from 'discord.js';
import { YouTube } from '@livecord/notify';
import Parser from 'rss-parser';
import * as fs from 'fs'
import * as path from 'path'
import { changeBotChannel } from './db_manip.js';

const TOKEN = process.env.BOT_TOKEN;
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.commands = new Collection();
const yt = new YouTube({});
const parser = new Parser();
let botChannel;

// Registering commands and events
const commandsPath = './commands/config';
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = await import(`./${filePath}`);
    client.commands.set(command.default.name, command);
}

const eventsPath = './events';
const eventsFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));
for (const file of eventsFiles) {
    const filePath = path.join(eventsPath, file);
    const event = await import(`./${filePath}`);
    if (event.default.once) {
        client.once(event.default.name, (interaction) => event.default.execute(interaction));
    } else {
        client.on(event.default.name, (interaction) => event.default.execute(interaction));
    }
}


// EthosLab YT channel tracking
yt.on("ready", (ready) => {
    yt.subscribe(["UCFKDEp9si4RmHFWJW1vYsMA", "UCEq_Dr1GHvnNPQNfgOzhZ8Q"]);
    console.log("Youtube connected at: ", ready);
});

yt.on("upload", video => {
    botChannel.send(`@everyone 
New video from ${video.author}!
${video.link}`);
});


// CS:GO Update tracking
setInterval((async () => {
    let recentPostDate = JSON.parse(fs.readFileSync("./cs-updates.json"))

    const feed = await parser.parseURL("https://blog.counter-strike.net/index.php/category/updates/feed/");
    const comparePostDate = feed.lastBuildDate;

    if (recentPostDate != comparePostDate) {
        fs.writeFileSync("./cs-updates.json", JSON.stringify(comparePostDate));
        botChannel.send(`@everyone - NEW CSGO UPDATE: https://blog.counter-strike.net/index.php/category/updates/`);
    }
}), 60000);


await client.login(TOKEN);
botChannel = client.channels.cache.get("1003755009151864862");