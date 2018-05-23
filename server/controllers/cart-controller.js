const Cart = require ("../models/cart")
const mongoose=require('mongoose')


module.exports={
    newCart:(req,res,next)=>{
        Cart.findOne({customer_id:req.params.id},(err,result)=>{
            if(err) {
                return res.status(500).json(err)
            }else if(result==null){
                const itemId= mongoose.Types.ObjectId(req.body.itemid)
                let addItem ={
                    _id:itemId,
                    total:Number(req.body.total)
                
                } 
                console.log('satu masuk sini ga',typeof(addItem.total))
                let newCart= new Cart({
                    customer_id:req.params.id,
                    items:[addItem]
                })
                newCart.save((err,cart)=>{
                    if(err) res.status(500).send(err)
                    else{
                        return res.json(cart)
                    }
                })
            }
            else{
                console.log('dua masuk sini ga')
                next()
            }
           
        })
        
    },

    deleteCart:(req,res,next)=>{
        Cart.findByIdAndRemove(req.params.id,(err,result)=>{
            if(err) res.status(500).json(err)
            else{
                res.json({message : 'Cart deleted'})
            }
        })
    },

    // addToCart: (req, res, next) => {
    //     cart = Cart.findOne(customer_id)
    //     if(cart){
    //         new Cart()
    //     }else{
    //         cart.delete()
    //         cart.bulkUpdate()
    //     }
    // }

    addToCart:(req,res,next)=>{
        console.log('masuk sini')
        Cart.findOne({customer_id:req.params.id},(err,result)=>{

            
            if(err) {
                res.status(500).json(err)
            }
            else{
                console.log(result)
                if (result === null) {
                    let addItem ={
                        _id:req.body.itemid,
                        total:Number(req.body.total)
                    }
                    let newCart= new Cart({
                        customer_id:req.params.id,
                        items:[addItem]
                    })
                    newCart.save((err,cart)=>{
                        if(err) res.status(500).send(err)
                        else{
                            return res.json(cart)
                        }
                    })
                } else {
                    let items = result.items
                    let id = result.customer_id // id cart
                    if (String(id) === req.params.id) {
                        console.log(' disniii rs')
                        let isFind = false;
                        let eachitem = (i)=>{
                                                     if (req.body.itemid === String(item._id)) {
                                console.log("MASUK IF CUUUYYYYYY")
                                item.total = item.total + Number(req.body.total)

                                
                                Cart.findByIdAndUpdate(result._id, result, (err, resultLagi)=>{
                                    console.log("masuk cart update tapi ngga masuk-masuk")
                                    if(err) {
                                        console.log(err)
                                        res.status(500).json(err)
                                    } else {
                                        console.log("CARRRTTTTTT")
                                        Cart.findById({_id: resultLagi._id})
                                        .then((resp) => {
                                            isFind = true;
                                            console.log("===> ISFIND: ", isFind)
                                            return res.send(resp);
                                        })
                                        .catch(err => {
                                            console.log("ERRRORNYA GLADYS: ", err)
                                        })
                                    }
                                    
                                })
                            }
                        }
                        // items.forEach(item => {
                        //     console.log("BODY ITEM ID: ", req.body.itemid);
                        //     console.log("ITEM_ID: ", String(item._id));
                        //     console.log("PERBANDINGAN: ", req.body.itemid === String(item._id))
                        //     if (req.body.itemid === String(item._id)) {
                        //         console.log("MASUK IF CUUUYYYYYY")
                        //         item.total = item.total + Number(req.body.total)

                                
                        //         Cart.findByIdAndUpdate(result._id, result, (err, resultLagi)=>{
                        //             console.log("masuk cart update tapi ngga masuk-masuk")
                        //             if(err) {
                        //                 console.log(err)
                        //                 res.status(500).json(err)
                        //             } else {
                        //                 console.log("CARRRTTTTTT")
                        //                 Cart.findById({_id: resultLagi._id})
                        //                 .then((resp) => {
                        //                     isFind = true;
                        //                     console.log("===> ISFIND: ", isFind)
                        //                     return res.send(resp);
                        //                 })
                        //                 .catch(err => {
                        //                     console.log("ERRRORNYA GLADYS: ", err)
                        //                 })
                        //             }
                                    
                        //         })
                        //     }
                        // })                        
                            
                        console.log("ISFIND: ", isFind)
                        if (!isFind) {
                            console.log(' datanya ga ada', result)
                            let obj = {
                                _id: mongoose.Types.ObjectId(req.body.itemid),
                                total: Number(req.body.total)
                            }
                            result.items.push(obj)
                            console.log("====> ", result)
                            Cart.findByIdAndUpdate(result._id,result,(err, resultLagi)=>{
                                if(err) res.status(500).json(err)
                                Cart.findById({_id: resultLagi._id})
                                .then((resp) => {
                                    return res.send(resp)
                                })
                            })   
                        }
                    }
                }
                
                
                
                // res.send(result.items)
                // const itemId= mongoose.Types.ObjectId(req.body.itemid)
                // for(var i=0; i<result.items.length; i++){
                //     // console.log(itemId.toString()==result.items[i]._id.toString())
                //     if(itemId.toString()==result.items[i]._id.toString()){
                //         console.log('masuk ke if Item Id')
                //         result.items[i].total+=Number(req.body.total)
                //         // console.log(result.items[i])
                //         Cart.findByIdAndUpdate(result.id,result,(err,resultLagi)=>{
                //             if(err) res.status(500).json(err)
                //             return res.json(resultLagi)
                //         })
                //     }
                //     else{
                        // let addItem ={
                        //     _id:itemId,
                        //     total:Number(req.body.total)
                        // } 
                        // // console.log('masuk ke else')
                        // result.items.push(addItem)
                        // // console.log("RESULLLLLTT",result)
                        // Cart.findByIdAndUpdate(result.id,result,(err,result2)=>{
                        //    return res.json(result2)
                        // })
                       
                //     }
                // }

               
            }
        })
    }
}