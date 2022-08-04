import { retrieveDocumentsWith } from "../../db_manip.js";

export default {
    name: "upload",
    async execute(inter, yt, client) {
        const documents = await retrieveDocumentsWith('ytEnabled', true);
        documents.forEach((doc) => {
            const botChannelID = doc.notifierChannel;
            const channel = client.channels.cache.get(botChannelID);
            channel.send(`@everyone New video from ${inter.author}: ${inter.link}`);
        });
    }
}