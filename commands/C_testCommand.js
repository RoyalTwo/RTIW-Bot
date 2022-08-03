import { SlashCommandBuilder } from "discord.js";

export default {
    data: new SlashCommandBuilder()
        .setName('test')
        .setDescription('does a test'),
    name: "test",
    async execute(interaction) {
        await interaction.reply('test!');
    }
}