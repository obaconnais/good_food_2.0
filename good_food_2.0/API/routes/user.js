/***********************************************/
/********* import necessary librairies *********/
/***********************************************/
const userCtrl = require("../controler/user")
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
