/***********************************************/
/********* import necessary librairies *********/
/***********************************************/
const userCtrl = require("./controller/user")
const express = require("express")

/***********************************************/
/******** definition of request on API *********/
/***********************************************/
let router = express.Router()


/***********************************************/
/*********** routage de la ressource ***********/
/***********************************************/
/**
* route to create a user
*/
router.put('',userCtrl.createUser)

/**
* route to get the user_Id thanks to its mail 
*/
router.get('/:mail', userCtrl.getUserId)

/**
* route to get a user thanks to its id
*/
router.get('/:id', userCtrl.getUser)

/**
* route to delete a user
*/
router.delete('/:id', userCtrl.deleteUser)

/**
* route to set a user
*/
router.patch('/:id', userCtrl.setUser)

module.exports = router
