var express = require('express');
var router = express.Router();
// var {
// newCart

// }=require('../controllers/cartbaru-controller')

var{

newCart,
addToCart,
deleteCart

}=require('../controllers/cart-controller')

router.post('/add',newCart)
router.delete('/delete/:id',deleteCart)
//disini id nya , id customer
router.post('/add/:id',addToCart)

module.exports = router;
