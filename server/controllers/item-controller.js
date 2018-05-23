const Item = require ("../models/Item")

module.exports={

    addNewItem:(req,res)=>{
        let newItem = new Item({
            item_name: req.body.item_name,
            item_price:req.body.item_price,
            pic_url:req.body.pic_url

        })
        
        newItem.save((error,item)=>{
            if(error) res.status(500).send(error)
            else{
                return res.json(item)
            }
        })
    },

    getAllItems:(req,res,next)=>{
        Item.find({})
        .then(item=>{
            res.send(item)
        })
        .catch(error=>{
            res.send(error)
        })
    },

    getItemsByName:(req,res,next)=>{
        Item.find({name:req.body.name})
        .then(item=>{
            res.send(item)
        })
        .catch(error=>{
            res.send(error)
        })
    },

    deleteItem:(req,res,next)=>{
        Item.findByIdAndRemove(req.params.id,(err,result)=>{
            if(err) res.status(500).json(err)
            else{
                res.json({message : "Item deleted"})
            }
        })
    },

    updateItem:(req,res,next)=>{
        let updateItem={
            item_name : req.body.name,
            item_price : req.body.price
        }

        Item.findByIdAndUpdate(req.params.id,updateItem,(err,result)=>{
            if(err) res.status(500).json(error)
            else{
                res.status(500).json({message : 'Item Data Updated'})
            }
        })
    }

}