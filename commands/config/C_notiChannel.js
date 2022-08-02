import { SlashCommandBuilder } from "discord.js";

export default {
    data: new SlashCommandBuilder()
        .setName('notichannel')
        .setDescription('Changes the notification channel to the one supplied!'),
    name: "notiChannel",
    async execute(interaction) {
        await console.log(interaction);
    }
}