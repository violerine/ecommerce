const Cart = require ("../models/cart")
const mongoose=require('mongoose')

module.exports={
    newCart:(req,res,next)=>{
      let newBasket=new Cart(req.body)
        newBasket.save((err,cart)=>{
            if(err) res.status(500).send(err)
            else{
                return res.json(cart)
            }
        })
    }
}

