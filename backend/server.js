const express = require('express');
const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');

dotenv.config();
const url = process.env.MONGO_URI;
const client = new MongoClient(url);

// Database Name
const dbName = 'passman';
const app = express();
const port = 3000;
app.use(bodyParser.json());
app.use(cors());

client.connect();
const db = client.db(dbName);

//Get Passwords from db
app.get('/', async (req, res) => {
    const collection = db.collection('passwords');
    const findResult = await collection.find({}).toArray();
    res.json(findResult)
})

//Insert password to db
app.post('/', async (req, res) => {
    const passentry = req.body;
    const collection = db.collection('passwords');
    const findResult = await collection.insertOne(passentry);
    res.json({success: true, result: findResult})
})

//Delete password from db
app.post('/', async (req, res) => {
    const passdel = req.body;
    const collection = db.collection('passwords');
    const findResult = await collection.deleteOne(passdel);
    res.json({success: true, result: findResult})
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})