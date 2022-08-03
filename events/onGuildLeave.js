import { createServer } from "../db_manip.js";

export default {
    name: 'guildDelete',
    once: false,
    execute(guild) {
        console.log(guild.systemChannel.name);
        createServer(guild.id, guild.systemChannel.id)
    }
}