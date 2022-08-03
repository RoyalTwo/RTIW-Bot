import * as dotenv from 'dotenv';
dotenv.config();
import { Client, Collection, GatewayIntentBits } from 'discord.js';
import { YouTube } from '@livecord/notify';
import Parser from 'rss-parser';
import * as fs from 'fs'
import * as path from 'path'
import { retrieveAllDocuments } from './db_manip.js';
import status from './util/errorSuccessMsg.js';

const TOKEN = process.env.BOT_TOKEN;
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildIntegrations,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.MessageContent]
});
client.commands = new Collection();
const yt = new YouTube({});
const parser = new Parser();


// Registering commands and events
(async function registerCommands(commandsPath) {
    const commandFiles = fs.readdirSync(commandsPath, { withFileTypes: true });
    for (const file of commandFiles) {
        if (!file.isDirectory()) {
            const filePath = path.join(commandsPath, file.name);
            try {
                const command = await import(`./${filePath}`);
                client.commands.set(command.default.name, command);
            } catch (error) {
                // MAKE FILES FOR ERRORS
                console.log(`${status('err')} Command "${filePath}" is not exported correctly. Skipping...`);
            }
        }
        else {
            const newPath = path.join(commandsPath, file.name)
            registerCommands(newPath);
        }
    }
})('./commands');
async function registerEvents(eventPath) {
    const eventsFiles = fs.readdirSync(eventPath).filter(file => file.endsWith('.js'));
    for (const file of eventsFiles) {
        const filePath = path.join(eventPath, file);
        try {
            const event = await import(`./${filePath}`);
            if (eventPath == "./events/youtube") {
                yt.on(event.default.name, (interaction) => event.default.execute(interaction, yt, client));
            }
            else {
                if (event.default.once) {
                    client.once(event.default.name, (interaction) => event.default.execute(interaction));
                } else {
                    client.on(event.default.name, (interaction) => event.default.execute(interaction));
                }
            }
        } catch (error) {
            console.log(`${status('err')} Event "${filePath}" is not exported correctly. Skipping...`);
        }
    }
}
registerEvents("./events/youtube");
registerEvents("./events");

await client.login(TOKEN);

// MAKE THIS INTO EVENT EMITTER PLEASE FOR THE LOVE OF GOD THIS IS BAD TO HAVE HERE
// CS:GO Update tracking
setInterval((async () => {

    let recentPostDate = JSON.parse(fs.readFileSync("./cs_update.json"))

    const feed = await parser.parseURL("https://blog.counter-strike.net/index.php/category/updates/feed/");
    const comparePostDate = feed.lastBuildDate;

    if (recentPostDate != comparePostDate) {
        fs.writeFileSync("./cs_update.json", JSON.stringify(comparePostDate));
        const documents = await retrieveAllDocuments();
        documents.forEach((doc) => {
            const botChannelID = doc.botChannel;
            const channel = client.channels.cache.get(botChannelID);
            channel.send(`@everyone - NEW CSGO UPDATE: https://blog.counter-strike.net/index.php/category/updates/`);
        });
    }
}), 60000);