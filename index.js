'use strict';

const argv = require('minimist')(process.argv.slice(2));
const port = argv.p || argv.port || 8001;

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const db = require('./database/database');

app.use(bodyParser.json()); // for parsing application/json
app.use(express.json({ limit: '4mb' }));
app.use(express.urlencoded({ limit: '4mb', extended: true }));

app.post('/car', (request, response) => {
    const data = request.body;
    db.writeToCollection(data, "car").then(result => {
        response.type('application/json');
        response.json({created : result});
    }).catch(err => {
        response.status(400).send('Bad request.\n' + err);
    });
});

app.get('/cars', (request, response) => {
    db.getAllFromCollection("car").then(result => {
        response.type('application/json');
        response.status(200).send(result);
    }).catch(err => {
        response.status(500).send('Internal server error.\n' + err);
    });
});

app.get('/car/:id', (request, response) => {
    let id = request.params.id;
    db.getFromCollectionById("car", id).then(result => {
        response.type('application/json');
        response.status(200).send(result);
    }).catch(err => {
        response.status(500).send('Internal server error.\n' + err);
    });
});

app.delete('/car/:id', (request, response) => {
    let id = request.params.id;
    db.deleteFromCollectionById("car", id).then(result => {
        response.json({success : id});
    }).catch(err => {
        response.status(500).send('Internal server error.\n' + err);
    });
});

app.listen(port, () => {
    console.info('Listening for incoming calls on port', port);
});
