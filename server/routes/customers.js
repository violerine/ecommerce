var express = require('express');
var router = express.Router();
var {
  getCustomers,
  register,
  login,
  deleteCustomer,
  updateCust,

}=require('../controllers/customer-controller')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/',getCustomers)
router.post('/register',register)
router.post('/login',login)
router.delete('/delete/:id',deleteCustomer)
// router.put('/update/id',updateCust)


module.exports = router;
