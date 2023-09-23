require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { MongoClient } = require('mongodb');
const url = process.env.MONGO_URL;
const client = new MongoClient(url);
client.connect();
const dataBase = process.env.MONGO_DB
const userCred = process.env.MONGO_USER_CRED
const userData = process.env.MONGO_USER_DATA


async function insertData(data) {
  const db = client.db(dataBase);
  const coll1 = db.collection(userCred);
  const coll2 = db.collection(userData);
  const userSchema = {
    username: data.username,
    posts: []
  }
  try {
    let insertCred = await coll1.insertOne(data)
    let insertData =await coll2.insertOne(userSchema)
    if ((insertCred.acknowledged) && (insertData.acknowledged)) {
      console.log(insertCred.acknowledged,insertData.acknowledged);
      return (insertCred.insertedId);
    }
    else {
      return (false)
    }
  }
  catch (err) {
    console.log(err);
  }
}


async function verifyToken(token) {
  let tokenData = (jwt.verify(token, process.env.TOKEN, { expiresIn: 30, audience: process.env.JWT_AUD }, (err, decoded) => (decoded)
  ))
  if (tokenData === undefined)
    return (tokenData)
  else {
    try {
      let data = {
        username: tokenData.username
      }
      const db = client.db(dataBase);
      const coll1 = db.collection(userCred)
      const query = await coll1.findOne(data);
      if (query._id.toString() == tokenData.id) {
        return ({
          username:query.username,
          name:query.name,
          gender:query.gender
        });
      }
    }
    catch (err) {
      return (undefined)
    }
  }

}


async function checkLoginData(data) {
  const db = client.db(dataBase);
  const coll = db.collection(userCred);
  const coll2 = db.collection(userData)
  const data2 = { username: (data.username) }
  try {
    const query = await coll.findOne(data);
    if (query == null) {
      return (false)
    }
    else {
      try {
        let cookieData = {
          id: query._id,
          username: query.username,
          name: query.name,
          gender: query.gender
        }
        let expTime = '30 days'
        let token = jwt.sign(cookieData, process.env.TOKEN, { expiresIn: expTime, audience: process.env.JWT_AUD });
        let finalData = {
          cookieData: cookieData,
          token: token,
          expireTime: expTime,
        }
        return (finalData)
      }
      catch (error) {
        return (false)
      }
    }
  }
  catch (err) {
    console.log(err);
  }
}


async function checkUsername(data) {
  const db = client.db(dataBase);
  const coll = db.collection(userCred);
  const coll1 = db.collection(userData);
  const check = await coll.findOne({ username: data.username });
  if (check == null) {
    if ('name' in data) {
      let insertUser=await insertData(data)
      if (insertUser) {
        let cookieData = {
          id: insertUser,
          username: data.username,
          name: data.name,
          gender: data.gender
        }
        let expTime = '30 days'
        var token = jwt.sign(cookieData, process.env.TOKEN, { expiresIn: expTime, audience: process.env.JWT_AUD });
        let finalData = {
          cookieData: cookieData,
          token: token,
          expireTime: expTime
        }
        return (finalData)
      }
    }
    else {
      return false
    }
  }
  else {
    if ('name' in data)
      return false
    else
      return (check.salt);
  }
}


async function hashPass(message) {
  if ('name' in message) {
    const salt = await bcrypt.genSalt(10)
    const hashedPass = await bcrypt.hash(message.password, salt)
    message.password = hashedPass
    message.salt = salt
    return (message)
  }
  else {
    const saltCheck = (await checkUsername(message))
    if (saltCheck === false)
      return (false)
    else {
      message.password = await bcrypt.hash(message.password, saltCheck)
      return (message)
    }
  }
}

function auth(app) {
  //Login post request
  app.post('/login', async (req, res) => {
    const message = req.body.credentials;
    const checkHash = await hashPass(message)
    if (checkHash === false) {
      {
        res.json(false)
      }
    }
    else {
      res.json(await checkLoginData(checkHash));
    }
  });

  //verification of token
  app.post('/verify', async (req, res) => {
    const message = req.body
    let check = await verifyToken(message.token)
    if (check === undefined)
      res.json('false')
    else
      res.json(check)

  });

  //Register post request
  app.post('/register', async (req, res) => {
    const message = req.body.formData;
    res.json(await checkUsername(await hashPass(message)));
  });
}

module.exports = auth;