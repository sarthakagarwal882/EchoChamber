require('dotenv').config();
const generateUniqueId = require('generate-unique-id');
const { MongoClient } = require('mongodb');
const url = process.env.MONGO_URL;
const client = new MongoClient(url);
client.connect();
const dataBase = process.env.MONGO_DB
const userCred = process.env.MONGO_USER_CRED
const userData = process.env.MONGO_USER_DATA
const commonData = process.env.MONGO_DATA

async function postuser(data) {
    const db = client.db(dataBase);
    const coll = db.collection(userCred);
    const coll1 = db.collection(userData);
    const coll2 = db.collection(commonData);
    try {
        {
            const uniqueId = generateUniqueId()
            let finalDataUser = {
                post: data.post,
                likes: [],
                comments: [],
                date: data.date,
                gender: data.gender,
                uniqueId:uniqueId
            }
            let finalDataAll = {
                post: data.post,
                likes: 0,
                comments: [],
                date: data.date,
                gender: data.gender,
                username: data.username,
                uniqueId:uniqueId
            }
            const storeUserData = await coll1.updateOne(
                { username: data.username },
                { $push: { posts: finalDataUser } }
            )
            const storeCommomData = await coll2.insertOne(
                { post: finalDataAll }
            )
            if (storeUserData.acknowledged && storeCommomData.acknowledged)
                return true
            else
                return false
        }
    }
    catch (err) {
        console.log(err);
    }
}

async function getPosts() {
    try {
        const db = client.db(dataBase);
        const coll = db.collection(userCred);
        const coll1 = db.collection(userData);
        const coll2 = db.collection(commonData);

        let data = await coll2.find({}).toArray();
        return (data);
    }
    catch (err) {
        console.log(err);
    }
}

function post(app) {
    app.post('/postData', async (req, res) => {
        const message = req.body.data;
        res.json(await postuser(message))
    });

    app.get('/getData', async (req, res) => {
        res.json(await getPosts());
    })
}

module.exports = post;
