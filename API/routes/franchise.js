/***********************************************/
/********* import required librairies *********/
/***********************************************/
const franchiseCtrl = require("../controler/franchise")
const express = require('express')

/***********************************************/
/******** definition of request on API *********/
/***********************************************/
let router = express.Router()

/***********************************************/
/*************** route resources ***************/
/***********************************************/

/**
 * route to create a franchise
 */
router.put('',franchiseCtrl.createFranchise)

/**
 * route to set a franchise
 */
router.patch('/:_id', franchiseCtrl.setFranchise)

/**
 * route to delete a franchise
 */
router.delete('/:_id', franchiseCtrl.deleteFranchise)

/**
 * route to get a franchise by its name
 */
router.get('/name/:name',franchiseCtrl.getFranchiseByName)

/**
 * route to get a franchise by its id
 */
router.get('/id/:_id',franchiseCtrl.getFranchiseById)

/**
 * route to get all franchises
 */
router.get('/all', franchiseCtrl.getAllFranchises)

module.exports = router