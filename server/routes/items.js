var express = require('express');
var router = express.Router();
var {
    addNewItem,
    getAllItems,
    getItemsByName,
    updateItem,
    deleteItem
}=require ("../controllers/item-controller")
const images = require('../helpers/uploadpic')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/upload',images.multer.single('image'),
images.sendUploadToGCS,(req,res)=>{
  res.send({
    status:200,
    message:'Your file uploaded',
    link:req.file.cloudStoragePublicUrl
  }) 
})

router.post('/add',addNewItem)
router.get('/get',getAllItems)
router.get('/:name',getItemsByName)
router.put('/update/:id',updateItem)
router.delete('/delete/:id',deleteItem)

module.exports = router;
