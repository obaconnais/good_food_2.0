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
    router.get('/find/:name',restaurantCtrl.findRestaurantByName)
    router.put('/restaurant/create',restaurantCtrl.createRestaurant)
}