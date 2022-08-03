import { SlashCommandBuilder, Routes } from 'discord.js';
import { REST } from '@discordjs/rest';
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import status from './errorSuccessMsg.js';
dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const commands = [];
const commandsPath = 'C:\\Users\\Sierra\\Documents\\Projects\\discord-bot\\commands\\';
process.on('unhandledRejection', error => {
    console.error('Unhandled promise rejection:', error);
});

async function registerCommands(commandsPath) {
    const commandFiles = fs.readdirSync(commandsPath, { withFileTypes: true });
    for (const file of commandFiles) {
        if (!file.isDirectory()) {
            const filePath = path.join(commandsPath, file.name);
            try {
                const command = await import(`file://${filePath}`);
                commands.push(command.default.data.toJSON());
            } catch (error) {
                console.log(`${status('err')} Command "${filePath}" is not exported correctly. Skipping...`);
            }
        }
        else {
            const newPath = path.join(commandsPath, file.name)
            await registerCommands(newPath);
        }
    }
}
await registerCommands(commandsPath);

const rest = new REST({ version: '10' }).setToken(process.env.BOT_TOKEN);

if (!process.argv[2]) {
    rest.put(Routes.applicationCommands(process.env.BOT_ID), { body: commands })
        .then(() => {
            console.log('Successfully registered application commands.')
            console.log(commands);
        })
        .catch(console.error);
}

if (process.argv[2] == "-d") {
    rest.put(Routes.applicationCommands(process.env.BOT_ID), { body: [] })
        .then(() => console.log('Successfully deleted all application commands.'))
        .catch(console.error);
}