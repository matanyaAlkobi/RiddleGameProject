import "dotenv/config";



import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGO_URI);

export async function connectToMongo() {
  try {
    await client.connect();
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err);
  }
}

const collection = client.db("RiddelGeme").collection("riddels");
export { client, collection };
