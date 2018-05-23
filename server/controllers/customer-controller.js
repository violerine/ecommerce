const Customer = require ('../models/customer')
const bcrypt=require("bcryptjs")
const jwt = require ("jsonwebtoken")


module.exports={

    getCustomers:(req,res,next)=>{
        Customer.find({})
        .then(cust=>{
            res.send(cust)
        })
        .catch(error=>{
            res.send(error)
        })
    },

    register:(req,res,next)=>{
        bcrypt.hash(req.body.password,10)
        .then(hash=>{
            let newCust = new Customer({
                name : req.body.name,
                username : req.body.username,
                password : hash
            })

            newCust.save((err,item)=>{
                if(err) res.status(500).send(error)
                else{
                    return res.json(item)
                }
            })
        })
        .catch(error=>{
            res.send(err)
        })

    },

    login:(req,res,next)=>{
        Customer.findOne({username:req.body.username},(err,result)=>{
            if(err)res.status(500).json(err)
            else if(!result){
                res.status(404).json({message : "User not found"})
            }
            else{
                console.log("result==>",result)
                 bcrypt.compare(req.body.password,result.password)
                .then(psw=>{
                    if(psw){
                        const payload={
                            username : result.username,
                            name:result.name,
                            _id:result._id
                        }
                        const token = jwt.sign(payload,"secretkey")
                        res.json({id: result._id, token:token, name:result.name})
                    }else{
                        res.send('incorrect password')
                    }
                    
                })
            }
        })
    },

    //belom di test, ntr rencananya bisa ganti username sendiri, ganti password sendiri
    //kalo ganti namenya aja brarti kaya edit user profile gitu

    updateCust:(req,res,next)=>{
        let updateCust ={
            name : req.body.name,
            username : req.body.username,
            password : req.body.password
        }

        Customer.findByIdAndUpdate(req.params.id,(err,result)=>{
            if(err) res.status(500).json(error)
            else{
                res.status(500).json({message:'Data Updated'})
            }
        })
    },

    deleteCustomer:(req,res,next)=>{
        Customer.findByIdAndRemove(req.params.id,(err,result)=>{
            if(err) res.status(500).json(error)
            else{
                res.json({message : 'Customer deleted'})
            }
        })
    },



}