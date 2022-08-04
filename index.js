import * as dotenv from 'dotenv';
dotenv.config();
import { Client, Collection, GatewayIntentBits } from 'discord.js';
import { YouTube } from '@livecord/notify';
import Parser from 'rss-parser';
import * as fs from 'fs'
import * as path from 'path'
import { retrieveAllDocuments } from './db_manip.js';
import status from './util/errorSuccessMsg.js';
import RSSFeed from './util/RSSFeed.js';

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
const rss = new RSSFeed();


// Registering commands and events (remove hard coded parts!)
(async function registerCommands(commandsPath) {
    const commandFiles = fs.readdirSync(commandsPath, { withFileTypes: true });
    for (const file of commandFiles) {
        if (!file.isDirectory()) {
            const filePath = path.join(commandsPath, file.name);
            try {
                const command = await import(`./${filePath}`);
                client.commands.set(command.default.name, command);
            } catch (error) {
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
            else if (eventPath == "./events/updater") {
                rss.on(event.default.name, (page) => event.default.execute(page, rss, client));
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
            console.error(error);
        }
    }
}
registerEvents("./events/updater");
registerEvents("./events/youtube");
registerEvents("./events");

// Test events
// setTimeout(() => yt.emit('upload', { author: 'test', link: 'aertAGEeagA' }), 2000);
// setTimeout(() => rss.emit('update', { title: 'testt', items: [{ link: 'teag' }] }), 2000);

await client.login(TOKEN);