import { SlashCommandBuilder } from "discord.js";
import { changeNotifierChannel } from "../../db_manip.js";

export default {
    data: new SlashCommandBuilder()
        .setName('notifier')
        .setDescription('Settings related to notifications.')
        .addChannelOption(option => option.setName('channel').setDescription('Choose where notifications are posted.'))
        .addBooleanOption(option => option.setName('yt').setDescription('Toggle YouTube notifications.')),
    name: "notifier",
    async execute(interaction) {
        const command = interaction.options.data[0].name;

        switch (command) {
            case 'channel':
                const newChannel = interaction.options.data[0].value;
                const currentServer = interaction.channel.guildId;
                changeNotifierChannel(currentServer, newChannel);
                break;

            case 'yt':
                break;
        }
        await interaction.reply('Channel switched!');
    }
}