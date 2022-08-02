import { SlashCommandBuilder } from "discord.js";

export default {
    data: new SlashCommandBuilder()
        .setName('notifier')
        .setDescription('Settings related to notifications.')
        .addChannelOption(option => option.setName('channel').setDescription('Choose where notifications are posted.'))
        .addBooleanOption(option => option.setName('yt').setDescription('Toggle YouTube notifications.')),
    name: "notifier",
    async execute(interaction) {
        console.log(interaction.channel);
    }
}