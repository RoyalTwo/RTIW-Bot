import { MongoClient } from "mongodb";
import * as dotenv from 'dotenv';
dotenv.config();

const mongoClient = new MongoClient(process.env.DB_URL);
await mongoClient.connect();
const collection = await mongoClient.db('discord_config').collection("servers");

export async function changeNotifierChannel(server, channel) {
    console.log(channel);
    await collection.updateOne({ "serverID": server }, { $set: { "botChannel": channel } }, (res) => {
        console.log(`Updated [${serverID}] notification channel to be [${channel}].`)
    });
}

export async function retrieveAllDocuments() {
    const cursor = collection.find({});
    const allDocs = await cursor.toArray();
    return allDocs;
}

// Remember to expand with more keys when more config options
// refactor to take in an object, and just insert that object. Instead of taking specific variables.
export async function createServer(serverID, botChannel) {
    const doc = {
        serverID,
        ytEnabled: "true",
        botChannel
    }
    await collection.insertOne(doc, (res) => {
        console.log(`Added [${serverID}].`);
    });
}

export async function deleteServer(serverID) {
    const doc = { serverID };
    collection.deleteOne(doc, (res) => {
        console.log(`Removed [${serverID}].`);
    });
}