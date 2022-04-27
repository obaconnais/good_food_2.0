/***********************************************/
/********* import necessary librairies *********/
/***********************************************/
const express = require("express")
const commandCtrl = require("../controler/command")

/***********************************************/
/******** definition of request on API *********/
/***********************************************/
let router = express.Router()

/***********************************************/
/*************** route resources ***************/
/***********************************************/
/**
* route to create a Command
*/
router.put('',commandCtrl.createCommand)

/**
* route to get the Command_Id thanks to its mail 
*/
router.get('/mail', commandCtrl.getCommandId)

/**
* route to get a Command thanks to its id
*/
router.get('/:id', commandCtrl.getCommand)

/**
* route to delete a Command
*/
router.delete('/:id', commandCtrl.deleteCommand)

/**
* route to set a Command
*/
router.patch('/:id', commandCtrl.setCommand)

module.exports = router
