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
                uniqueId: uniqueId
            }
            const storeUserData = await coll1.updateOne(
                { username: data.username },
                { $push: { posts: finalDataUser } }
            )
            const storeCommomData = await coll2.insertOne(
                {
                    post: data.post,
                    likes: [],
                    comments: [],
                    date: data.date,
                    gender: data.gender,
                    username: data.username,
                    uniqueId: uniqueId
                }
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
        const coll2 = db.collection(commonData);

        let data = await coll2.find({}).toArray();
        return (data);
    }
    catch (err) {
        console.log(err);
    }
}

async function likePost(message, res, action) {
    try {
        const db = client.db(dataBase);
        const coll = db.collection(userCred);
        const coll1 = db.collection(userData);
        const coll2 = db.collection(commonData);
        let like2;
        if (action === 'like') {
            like2 = await coll2.updateOne(
                { uniqueId: message.id },
                { $push: { likes: message.myUsername } }
            )
        }
        else {
            like2 = await coll2.updateOne(
                { uniqueId: message.id },
                { $pull: { likes: message.myUsername } }
            )
        }


        const collection1 = await coll1.findOne({ username: message.postUsername })
        if (collection1 !== null) {
            (collection1.posts).forEach(async (element, index) => {
                if (element.uniqueId === message.id) {
                    if (action === 'like') {
                        let checkUpdate = await coll1.updateOne({ username: message.postUsername }, {
                            $push: { [`posts.${index}.likes`]: message.myUsername }
                        })
                        res.json(checkUpdate.acknowledged && like2.acknowledged)
                    }
                    else {
                        let checkUpdate = await coll1.updateOne({ username: message.postUsername }, {
                            $pull: { [`posts.${index}.likes`]: message.myUsername }
                        })
                        res.json(checkUpdate.acknowledged && like2.acknowledged)
                    }
                }

            });
        }

    }
    catch (err) {
        console.log(err);
    }
}

async function getStats(message,res) {
    try {
        const db = client.db(dataBase);
        const coll2 = db.collection(commonData);
        const data = await coll2.findOne({ uniqueId: message.id })
        res.json({likes:data.likes,comments:data.comments})
    }
    catch (e) {

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

    app.post('/like', async (req, res) => {
        const message = req.body.data
        likePost(message, res, 'like')
    })
    app.post('/rmlike', async (req, res) => {
        const message = req.body.data
        likePost(message, res, 'unlike')
    })
    app.get('/test', () => {
        res.json('Test Successful!')
    })
    app.post('/getstats', async (req, res) => {
        let message = req.body.data
        // console.log(message);
        getStats(message,res)
    })
}

module.exports = post;
