import { deleteServer } from "../../db_manip.js";

export default {
    name: 'guildDelete',
    once: false,
    execute(guild) {
        deleteServer(guild.id);
    }
}