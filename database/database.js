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
    let numberOfDocs = (data.length);
    await openConnection();
    await db.collection(collection).insert(data, function (err, res) {
        if (err) {
            console.log('An error occured')
            throw err;
        }
    });
    console.log(`${numberOfDocs} DOCUMENTS SAVED TO DB`);
    closeConnection();
}

module.exports = {
    writeToCollection
}