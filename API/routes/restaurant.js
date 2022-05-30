/***********************************************/
/********* import required librairies *********/
/***********************************************/
const restaurantCtrl = require("../controler/restaurant")
const express = require('express')

/***********************************************/
/******** definition of request on API *********/
/***********************************************/
let router = express.Router()

/***********************************************/
/*************** route resources ***************/
/***********************************************/

/**
 * route to create a restaurant
 */
router.put('',restaurantCtrl.createRestaurant)

/**
 * route to set a restaurant
 */
router.patch('/:_id', restaurantCtrl.setRestaurant)

/**
 * route to delete a restaurant
 */
router.delete('/:_id', restaurantCtrl.deleteRestaurant)

/**
 * route to get a restaurant by its name
 */
router.get('/name/:name',restaurantCtrl.getRestaurantByName)

/**
 * route to get a restaurant by its id
 */
router.get('/id/:_id',restaurantCtrl.getRestaurantById)

/**
 * route to get a restaurant by its mail
 */
router.get('/mail/:mail', restaurantCtrl.getRestaurantByMail)

/**
 * route to get all restaurants
 */
router.get('/all', restaurantCtrl.getAllRestaurants)

/**
 * route to get restaurant that match to list of zipCode
 */
router.post('/zipCode', restaurantCtrl.getRestaurantByCity)
module.exports = router