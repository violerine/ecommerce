const mongoose = require("mongoose")
const Schema = mongoose.Schema

const customerSchema = new Schema({
    name:String,
    username : String,
    password: String,
})


const Customer = mongoose.model("customer",customerSchema)

module.exports=Customer