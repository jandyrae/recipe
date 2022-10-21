const getDB = require("../models/connectDB");
const { ObjectId } = require("mongodb");

const getAllRecipes = async (req, res, next) => {
  /* #swagger.description {return all recipes}*/
  const filter = Object.fromEntries(
    Object.entries({
    }).filter(([_k, v]) => v)
  );
  const collection = await _collection();
  // const documents = 
  await collection.find(filter).toArray((err, result) => {
    if (err) {
      res.status(500).json({ message: err });
    }
    res.status(200).json(result);
  });
};

const getOneRecipe = async (req, res, next) => {
  // retrieve one document by id GET
  /* #swagger.test {an id to test 632e9370ac262785f13f4f38}*/
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json("Use a valid recipe id to find a specific recipe.");
  }
  const collection = await _collection();
  await collection
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
      "rating": 5,
      "difficulty": "easy",
      "fromKitchenOf": "jandy@email.com"
  }
    */
  // create new record in database POST 201
  // try {
  const collection = await _collection();
  const {
    recipeName,
    cookTemp,
    cookTime,
    directions,
    ingredients,
    difficulty,
    mealTime,
    mealType,
    rating,
    fromKitchenOf,
  } = req.body;
  const document = await collection.insertOne(
    {
      recipeName,
      cookTemp,
      cookTime,
      directions,
      ingredients,
      difficulty,
      mealTime,
      mealType,
      rating,
      fromKitchenOf,
    },
    function (err, result) {
      if (err) {
        res.status(400).json({ message: err });
      };
      console.log(`${result.insertedCount} recipe document inserted`);
    }
  );
 
  res.status(201);
  res.json(req.body);
  console.table(document);
  // next();
};

const updateRecipe = async (req, res, next) => {
  /* #swagger.description For testing purposes use 
    {
      "recipeName":"Bread",
      "cookTemp":"350 F",
      "cookTime":"25 minutes",
      "mealType": "breads",
      "mealTime": "any/all"
      "ingredients":["5 cups flour", "1/4 cup sugar", "2 cups hot water", "2 Tbsp SAF yeast", "2 drops soy lecithin", "2 Tbsp salt"],
      "directions":"mix dry, add liquid, blend for 10min, knead, cook",
      "rating": 5,
      "difficulty": "easy",
      "fromKitchenOf": "jandy@email.com"
  }
  */
  // update existing record in database PUT 204
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json("Use a valid kitchen contact id to find a specific recipe ");
  }
  try {
    const collection = await _collection();
    // Mongo will give an id if one isn't provided (required)
    const {  
      recipeName,
      cookTemp,
      cookTime,
      directions,
      ingredients,
      difficulty,
      mealTime,
      mealType,
      rating,
      fromKitchenOf,
     } = req.body;
    const document = await collection.updateOne(
      {
        _id: ObjectId(req.params.id),
      },
      {
        $set: {
          recipeName,
          cookTemp,
          cookTime,
          directions,
          ingredients,
          difficulty,
          mealTime,
          mealType,
          rating,
          fromKitchenOf,
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


const deleteRecipe = async (req, res, next) => {
  /* #swagger.description delete requires an id to delete use one shown from calling a GET
   */
  // delete records from database DELETE 200
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json("Use a valid recipe id to delete specific owner.");
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

// https://www.mongodb.com/docs/rapid/reference/method/db.collection.insertOne

// try catch to access database, used in functions
const _collection = async () => {
  try {
    const db = await getDB();
    return db.collection("recipe");
  } catch (error) {
    console.error("Error getting recipe collection", error);
  }
};

module.exports = {
  getAllRecipes,
  getOneRecipe,
  createRecipe,
  updateRecipe,
  deleteRecipe,
};
