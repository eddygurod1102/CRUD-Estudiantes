const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

const url = "mongodb://127.0.0.1:27017";
const client = new MongoClient(url);
const database = "escuela";

let db;

module.exports = {
    setConnection: async () => {
        await client.connect();
        db = client.db(database);
        const collection = db.collection("students");
    },
    getDB: () => {
        return db;
    },
    close: () => {
        client.close();
    }
};