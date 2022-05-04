/***********************************************/
/********* import necessary librairies *********/
/***********************************************/
const express = require('express')
const authCtrl = require("../controler/auth")

/***********************************************/
/******** definition of request on API *********/
/***********************************************/
let router = express.Router()

/***********************************************/
/*************** route resources ***************/
/***********************************************/
router.post('', authCtrl.authenticationSend)

module.exports = router
