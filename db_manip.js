import { MongoClient } from "mongodb";
import * as dotenv from 'dotenv';
dotenv.config();

const mongoClient = new MongoClient(process.env.DB_URL);

export async function changeBotChannel(server, channel) {
    mongoClient.connect();
    const serverCollection = await mongoClient.db('discord_config').collection("servers");
    serverCollection.updateOne({ "serverID": server }, { $set: { "botChannel": channel } });
    mongoClient.close();
}

export async function retrieveCollection() {
    mongoClient.connect();
    const serverCollection = await mongoClient.db('discord_config').collection("servers");
    mongoClient.close();
    return serverCollection;
}

export async function retrieveAllDocuments() {
    mongoClient.connect();
    const collection = await mongoClient.db('discord_config').collection("servers");
    const cursor = collection.find({});
    const allDocs = await cursor.toArray();
    return allDocs;
}