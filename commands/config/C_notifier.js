import { SlashCommandBuilder } from "discord.js";
import { retrieveValue } from "../../db_manip.js";
import { changeKey } from "../../db_manip.js";

export default {
    data: new SlashCommandBuilder()
        .setName('notifier')
        .setDescription('Settings related to notifications.')
        .addChannelOption(option => option.setName('channel').setDescription('Choose where notifications are posted.'))
        .addBooleanOption(option => option.setName('yt').setDescription('Toggle YouTube notifications.'))
        .addBooleanOption(option => option.setName('rss').setDescription('Toggle RSS notifications.')),
    name: "notifier",
    async execute(interaction) {
        const command = interaction.options.data[0].name;
        const currentServer = interaction.channel.guildId;
        switch (command) {
            case 'channel':
                const newChannel = interaction.options.data[0].value;
                changeKey(currentServer, 'notifierChannel', newChannel);
                break;
            case 'yt':
                changeKey(currentServer, 'ytEnabled', interaction.options.data[0].value)
                break;
            case 'rss':
                break;
        }
        await interaction.reply('Option switched!');
    }
}