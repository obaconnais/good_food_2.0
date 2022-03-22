/***********************************************/
/********* import necessary librairies *********/
/***********************************************/
const userCtrl = require("./controller/user")

/***********************************************/
/******** definition of request on API *********/
/***********************************************/
module.exports = function (router) {
    /***********************************************/
    /*********** routage de la ressource ***********/
    /***********************************************/
    router.put('/user/create',userCtrl.createUser)
}
