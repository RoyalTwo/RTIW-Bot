import { retrieveDocumentsWith } from "../../db_manip.js";

export default {
    name: 'update',
    async execute(page, rss, client) {
        const documents = await retrieveDocumentsWith('rssEnabled', true);
        documents.forEach((doc) => {
            const botChannelID = doc.notifierChannel;
            const channel = client.channels.cache.get(botChannelID);
            channel.send(`@everyone NEW | ${page.title}: ${page.items[0].link}`);
        });
    }
}