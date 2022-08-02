import { SlashCommandBuilder } from "discord.js";

export default {
    data: new SlashCommandBuilder()
        .setName('notifier')
        .setDescription('Settings related to notifications.')
        .addChannelOption(option => option.setName('channels').setDescription('Choose where notifications are posted.')),
    name: "notifier",
    async execute(interaction) {
        console.log(interaction.options);
    }
}