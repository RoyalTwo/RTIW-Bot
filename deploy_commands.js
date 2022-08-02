import { SlashCommandBuilder, Routes } from 'discord.js';
import { REST } from '@discordjs/rest';
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';
dotenv.config();

const commands = [];
const commandsPath = './commands/config';
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = await import(`./${filePath}`)
    commands.push(command.default.data.toJSON());
}

const rest = new REST({ version: '10' }).setToken(process.env.BOT_TOKEN);
rest.put(Routes.applicationCommands(process.env.BOT_ID), { body: commands })
    .then(() => console.log('Successfully registered application commands.'))
    .catch(console.error);