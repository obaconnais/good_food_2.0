/***********************************************/
/********* import necessary librairies *********/
/***********************************************/

const express = require("express")
const userCtrl = require("../controler/user")

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

router.get('', userCtrl.getAllUsers)

/**
* route to create a user
*/
router.put('', userCtrl.createUser)

/**
* route to get the user_Id thanks to its mail 
*/
router.get('/mail', userCtrl.getUserId)

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
