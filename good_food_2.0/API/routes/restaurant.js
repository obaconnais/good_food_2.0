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
router.put('/restaurant',restaurantCtrl.createRestaurant)

/**
 * route to set a restaurant
 */
router.patch('/restaurant/:id', restaurantCtrl.setRestaurant)

/**
 * route to delete a restaurant
 */
router.delete('/restaurant/:id', restaurantCtrl.deleteRestaurant)

/**
 * route to get a restaurant by its name
 */
router.get('/restaurant/:name',restaurantCtrl.getRestaurantByName)

/**
 * route to get a restaurant by its id
 */
router.get('/restaurant/:id',restaurantCtrl.getRestaurantById)

/**
 * route to get a restaurant by its mail
 */
router.get('/restaurant/:mail', restaurantCtrl.getRestaurantByMail)

/**
 * route to get all restaurants
 */
router.get('/restaurants', restaurantCtrl.getAllRestaurants)

module.exports = router