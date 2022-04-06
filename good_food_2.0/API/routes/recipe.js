/***********************************************/
/********* import necessary librairies *********/
/***********************************************/

const express = require("express")
const recipeCtrl = require("../controler/recipe")

/***********************************************/
/******** definition of request on API *********/
/***********************************************/
let router = express.Router()

router.use((req, res, next) => {
    const event = new Date()
    console.log(`User time : ${event.toString()}`)
    next()
})
/***********************************************/
/*************** route resources ***************/
/***********************************************/

router.get('', recipeCtrl.getAllRecipes)

/**
* route to create a user
*/
// router.put('', recipeCtrl.createRecipe)

/**
* route to get the user_Id thanks to its mail 
*/
// router.get('/mail', recipeCtrl.getRecipeId)

/**
* route to get a user thanks to its id
*/
// router.get('/:id', recipeCtrl.getRecipe)

/**
* route to delete a user
*/
// router.delete('/:id', recipeCtrl.deleteRecipe)

/**
* route to set a user
*/
// router.patch('/:id', recipeCtrl.setRecipe)

module.exports = router
