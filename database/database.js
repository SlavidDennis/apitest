const mongo = require('mongodb');
const MongoClient = require('mongodb').MongoClient;

const dbName = 'apitest';
const url = `mongodb://tester:tester123@ds161092.mlab.com:61092/${dbName}`;
let client;
let db;

async function openConnection() {
    client = await MongoClient.connect(url);
    db = client.db(dbName);
    return db;
}

function closeConnection() {
    client.close();
}

async function writeToCollection(data, collection) {
    await openConnection();
    return db.collection(collection).insertOne(data).then(result => {
        closeConnection();
        return result.insertedId;
    }).catch(err => {
        closeConnection();
        throw err;
    });
}

async function getAllFromCollection(collection) {
    await openConnection();
    return db.collection(collection).find().toArray().then(result => {
        closeConnection();
        console.log(result);
        return result;
    }).catch(err => {
        closeConnection();
        throw err;
    });
}

module.exports = {
    writeToCollection,
    getAllFromCollection
}