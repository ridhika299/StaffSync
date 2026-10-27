const mongoose = require("mongoose");
const schema = new mongoose.Schema({ title:{type:String,required:true}, description:{type:String,default:""}, date:{type:Date,required:true}, location:{type:String,default:"Online"}, assignedTo:[{type:mongoose.Schema.Types.ObjectId,ref:"User"}], createdBy:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true} },{timestamps:true});
module.exports = mongoose.model("Training",schema);
