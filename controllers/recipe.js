const getDB = require("../models/connectDB");
const { ObjectId } = require("mongodb");

const getAllRecipes = async (req, res, next) => {
  // #swagger.tags = ['recipes']
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

const getOneRecipe = async (req, res, next) => {
  // #swagger.tags = ['recipes']
  // #swagger.description = 'An id is required to access, use `635202a1638557dd0a797441`.'
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
        res.status(500).json({ message: err });
      }
      res.status(200).json(result[0]);
    });
  console.log(ObjectId(req.params.id), document[0]);
};

const createRecipe = async (req, res, next) => {
  // #swagger.tags = ['recipes']
  /*	#swagger.parameters['obj'] = {
            in: 'body',
            description: 'Recipe information',
            required: true,
            schema: { $ref: "#/definitions/recipeArrayExample" }
    } */
  // create new record in database POST 201
  try {
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
    const document = await collection.insertOne({
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
    });
    console.log(`${document} recipe document inserted`);
    res.status(201);
    res.json(req.body);
    console.table(document);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err });
  }
  next();
};

const updateRecipe = async (req, res, next) => {
  // #swagger.tags = ['recipes']
  // #swagger.description = 'Use example ID `63536d1146db7e234e064f16` to update recipe'
  /*	#swagger.parameters['obj'] = {
            in: 'body',
            description: 'Recipe information',
            required: true,
            schema: { $ref: "#/definitions/recipeArrayExample" }
    } */
  // update existing record in database PUT 204
  if (!ObjectId.isValid(req.params.id)) {
    res
      .status(400)
      .json("Use a valid kitchen contact id to find a specific recipe");
  }
  try {
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
  // #swagger.description = "Deleting requires an id to delete. Use `63536d1146db7e234e064f16`"
  // #swagger.tags = ['recipes']
  /* #swagger.security = [{
        "apiKeyAuth": []
    }] */
  // delete records from database DELETE 200
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json("Use a valid recipe id to delete specific owner.");
  }
  try {
    const collection = await _collection();
    const document = await collection.deleteOne({
      _id: ObjectId(req.params.id),
    });
    res.status(200).json(document);
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
