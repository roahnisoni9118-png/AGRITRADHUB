const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
{
product:{
type:mongoose.Schema.Types.ObjectId,
ref:"Product",
required:true
},

merchant:{
type:mongoose.Schema.Types.ObjectId,
ref:"User",
required:true
},

farmer:{
type:mongoose.Schema.Types.ObjectId,
ref:"User",
required:true
},

quantity:{
type:Number,
default:1
},

contact:String,
area:String,

status:{
type:String,
default:"Pending"
}

},
{timestamps:true}
);

module.exports = mongoose.model("Order",orderSchema);