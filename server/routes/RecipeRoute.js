// routes/recipeRoute.js
const express = require("express");
const router = express.Router();
const verifyToken = require("../Middleware/middleware");
const {
  getAllRecipes,
  createRecipe,
  deleteRecipe,
  LikedList,
  getAllLikedRecipes,
  removeFromLikedRecipes,
  searchRecipes,
} = require("../controllers/RecipeController");

// Protected: Get all recipes
router.get("/recipe", verifyToken, getAllRecipes);

// Protected: Create a new recipe
router.post("/recipe", verifyToken, createRecipe);

// Public: Get liked recipes
router.get("/likedRecipes", getAllLikedRecipes);

// Public: Delete a recipe by ID
router.delete("/recipe/:id", deleteRecipe);

// Public: Add to liked list
router.post("/likedRecipes/:id", LikedList);

// Public: Remove from liked list
router.delete("/removeLiked/:id", removeFromLikedRecipes);

// Public: Search recipes by keyword
router.get("/searchRecipes/:key", searchRecipes);

module.exports = router;
