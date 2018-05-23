const mongoose = require("mongoose")
const Schema = mongoose.Schema 
const cartSchema = new Schema({
    customer_id :{type: Schema.Types.ObjectId, ref:'Customer'},
    items:[]
})

const Cart = mongoose.model("cart",cartSchema) 

module.exports = Cart