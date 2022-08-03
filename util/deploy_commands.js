import { SlashCommandBuilder, Routes } from 'discord.js';
import { REST } from '@discordjs/rest';
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const commands = [];
const commandsPath = 'C:\\Users\\Sierra\\Documents\\Projects\\discord-bot\\commands\\config';
const test = path.join(__dirname, "..", "commands/config");
const test2 = path.normalize(test);
console.log(test2);
const commandFiles = fs.readdirSync(test2).filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const filePath = path.join(test2, file);
    try {
        const command = await import(`file://${filePath}`)
        commands.push(command.default.data.toJSON());
    } catch (error) {
        console.log(`${'\x1b[31m'}Error: ${"\x1b[0m"} Command "${filePath}" is not exported correctly. Please fix immediately.`);
    }

}

const rest = new REST({ version: '10' }).setToken(process.env.BOT_TOKEN);
if (!process.argv[2]) {
    rest.put(Routes.applicationCommands(process.env.BOT_ID), { body: commands })
        .then(() => console.log('Successfully registered application commands.'))
        .catch(console.error);
}

if (process.argv[2] == "-d") {
    rest.put(Routes.applicationCommands(process.env.BOT_ID), { body: [] })
        .then(() => console.log('Successfully deleted all application commands.'))
        .catch(console.error);
}