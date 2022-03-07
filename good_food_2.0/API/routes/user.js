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
router.put('',userCtrl.createUser)

module.exports = router
