import { retrieveAllDocuments } from "../../db_manip.js";

export default {
    name: 'update',
    async execute(page, client) {
        const documents = await retrieveAllDocuments();
        documents.forEach((doc) => {
            const botChannelID = doc.botChannel;
            const channel = client.channels.cache.get(botChannelID);
            channel.send(`@everyone - NEW CSGO UPDATE: https://blog.counter-strike.net/index.php/category/updates/`);
        });
    }
}