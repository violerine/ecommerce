const mongoose = require ("mongoose")
const Schema = mongoose.Schema

const itemSchema = new Schema({
    item_name: String,
    item_price:Number,
    pic_url:String
})

const Item = mongoose.model("item",itemSchema)

module.exports = Item