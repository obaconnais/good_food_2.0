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
/*********** routage de la ressource ***********/
/***********************************************/

router.get('', userCtrl.getAllUsers)
// router.get('/:id', userCtrl.getUser)
// router.put('', userCtrl.addUser)
// router.patch('/:id', userCtrl.modifyUser)
// router.delete('/:id', userCtrl.deleteUser)
// router.put('', userCtrl.createUser)

module.exports = router
