const express = require("express")
const recipeCtrl = require("../controler/recipe")

let router = express.Router()

router.use((req, res, next) => {
    const event = new Date()
    // console.log(`User time : ${event.toString()}`)
    next()
})
/**
 * route to get all Recipes
 */
router.get('', recipeCtrl.getAllRecipes)
/**
 * route to get recipe with the name
 */
router.get('/name', recipeCtrl.findRecipe)
/**
 * route to get recipe with the Id
 */
router.get('/:id', recipeCtrl.getRecipeById)
/**
 * route to create a recipe
 */
router.put('', recipeCtrl.createRecipe)
/**
 * route to delete a recipe thanks to its Id
 */
router.delete('/:id', recipeCtrl.deleteRecipe)
/**
 * route to set recipe with the Id
 */
router.patch('', recipeCtrl.setRecipe)

module.exports = router

