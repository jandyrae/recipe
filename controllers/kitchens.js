const getDB = require("../models/connectDB");
const { ObjectId } = require("mongodb");

const getAllContacts = async (req, res, next) => {
  // #swagger.tags = ['fromTheKitchenOf']
  /* #swagger.description =  'The name or id is not needed to execute this GET' */
  /* #swagger.security = [{
          "OAuth2": [
              'read', 
              'write'
          ]
  }] */
  const filter = Object.fromEntries(Object.entries({}).filter(([_k, v]) => v));
  const collection = await _collection();
  const documents = await collection.find(filter).toArray((err, result) => {
    if (err) {
      res
        .status(500)
        .json(collection.error || "An error ocurred getting the collection.");
    }
    res.status(200).json(result);
  });
  console.log(documents);
};

const getOneContact = async (req, res, next) => {
  // #swagger.tags = ['fromTheKitchenOf']
  // #swagger.description = 'An id is required to access, use `63536cad46db7e234e064f15`.'

  if (!ObjectId.isValid(req.params.id)) {
    res
      .status(400)
      .json("Use a valid recipe owner id to find a specific recipe author.");
  }
  const collection = await _collection();
  const document = await collection
    .find({
      _id: ObjectId(req.params.id),
    })
    .toArray((err, result) => {
      if (err) {
        res.status(500).json({ message: err });
      }
      res.status(200).json(result[0]);
    });
  console.log(ObjectId(req.params.id), document[0]);
};

const createContact = async (req, res, next) => {
  // #swagger.tags = ['fromTheKitchenOf']
  /*	#swagger.parameters['obj'] = {
            in: 'body',
            description: 'Recipe information',
            required: true,
            schema: { $ref: "#/definitions/fromKitchenOfExample" }
    } */
  // create new record in database POST 201
  try {
    const collection = await _collection();
    const { firstName, lastName, email, phoneNumber } = req.body;
    const document = await collection.insertOne({
      firstName,
      lastName,
      email,
      phoneNumber,
    });
    console.log(`${document} recipe author document inserted`);
    res.status(201);
    res.json(req.body);
    console.table(document);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err });
  }
  next();
};

const updateContact = async (req, res, next) => {
  // #swagger.tags = ['fromTheKitchenOf']
  // #swagger.description = 'An id is required to update, use `63536cad46db7e234e064f15`.'
  /*	#swagger.parameters['obj'] = {
            in: 'body',
            description: 'Recipe information',
            required: true,
            schema: { $ref: "#/definitions/fromKitchenOfExample" }
    } */
      /* #swagger.security = [{
          "OAuth2": [
              'read', 
              'write'
          ]
  }] */
  // update existing record in database PUT 204
  if (!ObjectId.isValid(req.params.id)) {
    res
      .status(400)
      .json("Use a valid kitchen contact id to find a specific recipe author");
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
  // #swagger.tags = ['fromTheKitchenOf']
  /* #swagger.description = 'Delete requires an id to complete, use `63536cad46db7e234e064f15`'
   */
  /* #swagger.security = [{
          "OAuth2": [
              'read', 
              'write'
          ]
  }] */
  // delete records from database DELETE 200
  if (!ObjectId.isValid(req.params.id)) {
    res
      .status(400)
      .json("Use a valid recipe author id to delete specific owner.");
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
