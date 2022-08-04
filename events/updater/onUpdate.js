import { retrieveAllDocuments } from "../../db_manip.js";

export default {
    name: 'update',
    async execute(page, rss, client) {
        const documents = await retrieveAllDocuments();
        documents.forEach((doc) => {
            // check if it's enabled first
            const botChannelID = doc.botChannel;
            const channel = client.channels.cache.get(botChannelID);
            channel.send(`@everyone NEW | ${page.title}: ${page.items[0].link}`);
        });
    }
}