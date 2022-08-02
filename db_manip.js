import { MongoClient } from "mongodb";
import * as dotenv from 'dotenv';
dotenv.config();

export function changeBotChannel(client, channel) {
    MongoClient.connect(process.env.DB_URL, (err, client) => {
        const db = client.db();
        console.log(db);
        client.close();
    });
}