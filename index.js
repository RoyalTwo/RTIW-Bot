import * as dotenv from 'dotenv';
dotenv.config();
import { Client, GatewayIntentBits } from 'discord.js';
import { YouTube } from '@livecord/notify';
import Parser from 'rss-parser';
import * as fs from 'fs'
import { changeBotChannel } from './db_manip.js';

const TOKEN = process.env.BOT_TOKEN;
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const yt = new YouTube({})
const parser = new Parser();
let botChannel;

client.once('ready', () => {
    //should load settings from config database, but i'm testing this now
    console.log('Discord Bot Online!');
    botChannel = client.channels.cache.get("1003755009151864862")
    //should change value of bot channel
    let test = changeBotChannel(client, '234', 'testchannelid');
    client.guilds.fetch()
});


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


client.login(TOKEN);