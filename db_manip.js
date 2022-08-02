import { MongoClient } from "mongodb";
import * as dotenv from 'dotenv';
dotenv.config();

const mongoClient = new MongoClient(process.env.DB_URL);

export async function changeBotChannel(discClient, channel) {
    mongoClient.connect();
    const serverCollection = await mongoClient.db('discord_config').collection("servers");
    mongoClient.close();
}