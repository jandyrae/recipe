const getDB = require("../models/connectDB");
// const { ObjectId } = require("mongodb");
// const {kitchen} = require('./kitchens');
// const {recipe} = require('./recipe');

// async (req,res) => {
//   if (!req.user) {
//     return res.status(401).send("Not Authenticated");
//   }
// }
const getAllUsers = async (req, res, next) => {
  // #swagger.tags = ['users']
  // const verify = await index;
  if (!req.user) {
    return res.status(401).send("Not Authenticated");
  }
  const filter = Object.fromEntries(Object.entries({}).filter(([_k, v]) => v));
  const collection = await _collection();
  const documents = await collection.find(filter).toArray((err, result) => {
    if (err) {
      res.status(500).json({ message: err });
    }
    res.status(200).json(result);
  });
  console.log(documents);
};

const user = async (req, res, next) => {
  // #swagger.tags = ['user']
  /*	#swagger.parameters['obj'] = {
            in: 'body',
            description: 'User information',
            required: true}
    } */
  // create new record in database POST 201
    if (!req.user) {
    return res.status(401).send("Not Authenticated");
  }
  try {
    const collection = await _collection();
    const {
      identifier,
      email,
      given_name,
      family_name,
      locale,
      picture,
      nickname,
      recipe,
      kitchen,
    } = req.body;
    const document = await collection.insertOne({
      identifier,
      email,
      given_name,
      family_name,
      locale,
      picture,
      nickname,
      recipe,
      kitchen,
    });
    console.log(`${document} user document inserted`);
    res.status(201);
    res.json(req.body);
    console.table(document);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err });
  }
  next();
};
// try catch to access database, used in functions
const _collection = async () => {
  try {
    const db = await getDB();
    return db.collection("users");
  } catch (error) {
    console.error("Error getting user collection", error);
  }
};

module.exports = user, getAllUsers;

// { // raw json from auth0
//     "created_at": "2022-10-31T23:16:08.241Z",
//     "email": "jandyrae@gmail.com",
//     "email_verified": true,
//     "family_name": "Kiger",
//     "given_name": "Jandy",
//     "identities": [
//         {
//             "provider": "google-oauth2",
//             "user_id": "103502322576597651134",
//             "connection": "google-oauth2",
//             "isSocial": true
//         }
//     ],
//     "locale": "en",
//     "name": "Jandy Kiger",
//     "nickname": "jandyrae",
//     "picture": "https://lh3.googleusercontent.com/a/ALm5wu1Hqb1-BDJTSHbBiYa-qb5lk45e2bCAnGxcK7kUYoQ=s96-c",
//     "updated_at": "2022-11-03T01:42:38.684Z",
//     "user_id": "google-oauth2|103502322576597651134",
//     "last_ip": "47.150.188.105",
//     "last_login": "2022-11-03T01:42:38.684Z",
//     "logins_count": 14,
//     "blocked_for": [],
//     "guardian_authenticators": []
// }