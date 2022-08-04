import { SlashCommandBuilder } from "discord.js";
import { retrieveValue } from "../../db_manip.js";
import { changeKey } from "../../db_manip.js";

export default {
    data: new SlashCommandBuilder()
        .setName('notifier')
        .setDescription('Settings related to notifications.')
        .addSubcommandGroup(option =>
            option
                .setDescription('Toggle each notification type.')
                .setName('toggle')
                .addSubcommand(subcommand =>
                    subcommand
                        .setDescription('Toggle YT notifications')
                        .setName('yt')
                )
                .addSubcommand(subcommand =>
                    subcommand
                        .setDescription('Toggle RSS notifications')
                        .setName('rss')
                )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setDescription('Choose where notifications are posted.')
                .setName('channel')
                .addChannelOption(option => option.setName('channels').setDescription('Select channel.'))
        ),
    name: "notifier",
    async execute(interaction) {
        const command = interaction.options;
        console.log(command);
        const currentServer = interaction.channel.guildId;
        if (command._subcommand == 'channel') {
            const newChannel = command._hoistedOptions[0].value;
            changeKey(currentServer, 'notifierChannel', newChannel);
        }
        if (command._subcommand == 'rss') {
            const currentVal = await retrieveValue(currentServer, 'rssEnabled');
            changeKey(currentServer, 'rssEnabled', !currentVal);
        }
        if (command._subcommand == 'yt') {
            const currentVal = await retrieveValue(currentServer, 'ytEnabled');
            changeKey(currentServer, 'ytEnabled', !currentVal);
        }
        await interaction.reply('Option switched!');
    }
}