const { MongoClient } = require("mongodb");

const uri ="mongodb+srv://avmannet2202:avmannet@cluster0.ajl8l.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri);

let database;

async function connectToDB() {
  try {
    await client.connect();
    database = client.db("Store");
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
    process.exit(1);
  }
}

function getDB() {
  if (!database) {
    throw new Error("Database not initialized. Call connectToDB() first.");
  }
  return database;
}

module.exports = { connectToDB, getDB };
