const express = require("express")
const recipeCtrl = require("../controler/recipe")

let router = express.Router()

router.use((req, res, next) => {
    const event = new Date()
    console.log(`User time : ${event.toString()}`)
    next()
})

router.get('', recipeCtrl.getAllRecipes)
router.put('', recipeCtrl.createRecipe)
router.get('/:name', recipeCtrl.findRecipe)
router.get('/:id', recipeCtrl.getRecipe)
router.delete('/:id', recipeCtrl.deleteRecipe)
router.patch('/:id', recipeCtrl.setRecipe)

module.exports = router
