/***********************************************/
/********* import necessary librairies *********/
/***********************************************/
const recipeCtrl = require('./controler/recipe')
const express = require('express')

/***********************************************/
/******** definition of request on API *********/
/***********************************************/
let router = express.Router()


/***********************************************/
/*********** routage de la ressource ***********/
/***********************************************/
router.put('', recipeCtrl.createRecipe)

module.exports = router
