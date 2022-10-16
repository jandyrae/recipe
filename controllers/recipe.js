const getDB = require("../models/connectDB");
const { ObjectId } = require("mongodb");

const getAll = async (req, res, next) => {
  // retrieve all json in database GET
  /* #swagger.description {return all recipes}*/
  // const { firstName } = req.query;
  // takes the list and makes an object
  const filter = Object.fromEntries(
    Object.entries({
      // firstName,
    }).filter(([_k, v]) => v)
  );
  const collection = await _collection();
  const collectionKitchen = await _collectionKitchen();
  const documents = await collection.find(filter).toArray();
  const documentKitchen = await collectionKitchen.find(filter).toArray();
  const bothDocuments = documents.concat(documentKitchen); // doesn't actually merge the objects
  res.status(200).json(bothDocuments);
};

const getOne = async (req, res, next) => {
  // retrieve one document by id GET
  /* #swagger.test {an id to test 632e9370ac262785f13f4f38}*/
  const collection = await _collection();
  const document = await collection
    .find({
      _id: ObjectId(req.params.id),
    })
    .toArray();
  console.log(ObjectId(req.params.id));
  res.json(document[0]);

};

const createRecipe = async (req, res, next) => {
  /* #swagger.description 
    {
      "recipeName":"Bread",
      "cookTemp":"350 F",
      "cookTime":"25 minutes",
      "mealType": "breads",
      "mealTime": "any/all"
      "ingredients":["5 cups flour", "1/4 cup sugar", "2 cups hot water", "2 Tbsp SAF yeast", "2 drops soy lecithin", "2 Tbsp salt"],
      "directions":"mix dry, add liquid, blend for 10min, knead, cook",
  }, {
    "rating": 5,
    "difficulty": easy
  }
    */
  // create new record in database POST 201
  const collection = await _collection();
  const collectionKitchen = await _collectionKitchen();
  const { rating, difficulty } = req.body;
  const documentKitchen = await collectionKitchen.insertOne(
    {
      rating,
      difficulty,
    },
    function (err, result) {
      if (err) throw err;
      console.log(`${result.insertedCount} kitchen document inserted`);
    }
  );
  const {
    recipeName,
    cookTemp,
    cookTime,
    mealType,
    mealTime,
    ingredients,
    directions,
  } = req.body;
  const document = await collection.insertOne(
    {
      recipeName,
      cookTemp,
      cookTime,
      mealType,
      mealTime,
      ingredients,
      directions,
    },
    function (err, res) {
      if (err) throw err;
      console.log(`${res.insertedCount} recipe document inserted`);
    }
  );
  res.status(201);
  res.json(req.body);
  console.table(document, documentKitchen);
};

// try catch to access database, used in functions
const _collection = async () => {
  try {
    const db = await getDB();
    return db.collection("recipe");
  } catch (error) {
    console.error("Error getting recipe collection", error);
  }
};

const _collectionKitchen = async () => {
  try {
    const db = await getDB();
    return db.collection("kitchen");
  } catch (error) {
    console.error("Error getting kitchen collection", error);
  }
};

module.exports = {
  getAll,
  getOne,
  createRecipe,
};
