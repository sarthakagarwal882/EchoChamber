require('dotenv').config();
const { MongoClient } = require('mongodb');
const url = process.env.MONGO_URL;
const client = new MongoClient(url);
client.connect();
const dataBase = process.env.MONGO_DB
const userCred = process.env.MONGO_USER_CRED
const userData = process.env.MONGO_USER_DATA
const commonData = process.env.MONGO_dATA

async function postuser(data) {
    const db = client.db(dataBase);
    const coll = db.collection(userCred);
    const coll1 = db.collection(userData);
    const coll2 = db.collection(commonData);
    try {
        {
            let finalDataUser = {
                post: data.post,
                likes: [],
                comments: [],
                date: data.date,
                gender:data.gender
            }
            let finalDataAll = {
                post: data.post,
                likes: 0,
                comments: [],
                date: data.date,
                gender:data.gender
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

function post(app) {
    app.post('/postData', async (req, res) => {
        const message = req.body.data;
        res.json(await postuser(message))
    });

}

module.exports = post;
