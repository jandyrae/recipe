const getDB = require("../models/connectDB");
const { ObjectId } = require("mongodb");

const getAllContacts = async (req, res, next) => {
  // retrieve all json in database GET
  /* #swagger.description first name is not needed to execute this GET*/
  const filter = Object.fromEntries(
    Object.entries({
    }).filter(([_k, v]) => v)
  );
  const collection = await _collection();
  // const documents =
   await collection.find(filter).toArray((err, result) => {
    if (err) {
      res.status(500).json(
        collection.error || 'An error ocurred getting the collection.'
      );
    }
    res.status(200).json(result)
  });
  // res.json(documents);
};

const getOneContact = async (req, res, next) => {
  // retrieve one document by id GET
  /* #swagger.test {an id to test 632e9370ac262785f13f4f38}*/
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json("Use a valid recipe owner id to find a specific recipe author.");
  }
  const collection = await _collection();
  const document = await collection
    .find({
      _id: ObjectId(req.params.id),
    })
    .toArray((err, result) => {
      if (err) {
        res.status(400).json({ message: err });
      }
      res.status(200).json(result[0]);
    });
  console.log(ObjectId(req.params.id));
  // res.json(document[0]);
};


const createContact = async (req, res, next) => {
  /* #swagger.description  
  {
    "firstName":"First",
    "lastName":"Last",
    "email":"email@gmail.com",
    "phoneNumber": "6613174790"
}
  */
  // create new record in database POST 201
  const collection = await _collection();
  const { firstName, lastName, email, phoneNumber } = req.body;
  const document = await collection.insertOne(
    {
      firstName,
      lastName,
      email,
      phoneNumber
    },
    function (err, result) {
      if (err) throw err;
      console.log(`${result.insertedCount} recipe author's document inserted`);
    }
  );
  res.status(201);
  res.json(req.body);
  console.log(document);
  // next();
};

const updateContact = async (req, res, next) => {
  /* #swagger.description For testing purposes use 
  {
    "firstName":"FirstChange",
    "lastName":"LastChange",
    "email":"emailChange@gmail.com",
    "phoneNumber": "6613174790"
}
  */
  // update existing record in database PUT 204
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json("Use a valid kitchen contact id to find a specific recipe author");
  }
  try {
    const collection = await _collection();
    // Mongo will give an id if one isn't provided (required)
    const { firstName, lastName, email, phoneNumber } = req.body;
    const document = await collection.updateOne(
      {
        _id: ObjectId(req.params.id),
      },
      {
        $set: {
          firstName,
          lastName,
          email,
          phoneNumber,
        },
      }
    );
    res.status(204);
    res.json(req.body);
    console.log(document);
  } catch (err) {
    next(err);
  }
};

const deleteContact = async (req, res, next) => {
  /* #swagger.description delete requires an id to delete use one shown from calling a GET
   */
  // delete records from database DELETE 200
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json("Use a valid recipe author id to delete specific owner.");
  }
  try {
    const collection = await _collection();
    const document = await collection.deleteOne({
      _id: ObjectId(req.params.id),
    });
    res.status(200);
    res.json(document);
  } catch (err) {
    next(err);
  }
};

// try catch to access database, used in functions
const _collection = async () => {
  try {
    const db = await getDB();
    return db.collection("kitchens");
  } catch (error) {
    console.error("Error getting kitchens collection", error);
  }
};


module.exports = {
  getAllContacts,
  getOneContact,
  createContact,
  updateContact,
  deleteContact,
};
