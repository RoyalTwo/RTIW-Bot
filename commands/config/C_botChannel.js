import { SlashCommandBuilder } from "discord.js";

export default {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with Pong!'),
    name: "ping",
    async execute(interaction) {
        await interaction.reply('Pong!');
    }
}