/***********************************************/
/********* import required librairies *********/
/***********************************************/
const restaurantCtrl = require("../controller/restaurant")

/***********************************************/
/******** definition of request on API *********/
/***********************************************/
module.exports = function (router) {
    /***********************************************/
    /*********** routage de la ressource ***********/
    /***********************************************/
    // Create restaurant
    router.put('/restaurant',restaurantCtrl.createRestaurant)

    // Update restaurant
    router.patch('/restaurant/:id', restaurantCtrl.updateRestaurant)

    // Delete restaurant
    router.delete('/restaurant/:id', restaurantCtrl.removeRestaurant)

    // Find restaurants
    router.get('/restaurant/:name',restaurantCtrl.findRestaurantByName)
    router.get('/restaurant/id/:id',restaurantCtrl.findRestaurantById)
    router.get('/restaurants', restaurantCtrl.findAllRestaurants)
}