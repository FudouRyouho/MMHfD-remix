import { MongoClient, Db } from 'mongodb';

const uri = '';
const client = new MongoClient(uri);

let db: Db;

export async function connectDB(): Promise<Db> {
  if (!db) {
    await client.connect();
    db = client.db('mainDB'); // Nombre de tu base de datos
  }
  return db;
}

export async function getCollection(collectionName: string) {
  const database = await connectDB();
  return database.collection(collectionName);
}