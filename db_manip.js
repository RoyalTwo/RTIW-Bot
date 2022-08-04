import { MongoClient } from "mongodb";
import * as dotenv from 'dotenv';
import statusFunc from './util/errorSuccessMsg.js';
dotenv.config();

const mongoClient = new MongoClient(process.env.DB_URL);
await mongoClient.connect();
const collection = await mongoClient.db('discord_config').collection("servers");

export async function retrieveAllDocuments() {
    const cursor = collection.find({});
    const allDocs = await cursor.toArray();
    return allDocs;
}

export async function changeKey(server, key, value) {
    await collection.updateOne({ "serverID": server }, { $set: { [key]: value } }, (res) => {
        console.log(`${statusFunc('suc')} Updated [${server}] ${key} to be ${value}.`)
    });
}

// Remember to expand with more keys when more config options
// refactor to take in an object, and just insert that object. Instead of taking specific variables.
export async function createServer(serverID, notifierChannel) {

    const doc = {
        serverID,
        ytEnabled: "true",
        notifierChannel
    }

    await collection.insertOne(doc, (res) => {
        console.log(`${statusFunc('suc')} Added [${serverID}].`);
    });
}

export async function deleteServer(serverID) {
    const doc = { serverID };

    await collection.deleteOne(doc, (res) => {
        console.log(`${statusFunc('suc')} Removed [${serverID}].`);
    });

}
