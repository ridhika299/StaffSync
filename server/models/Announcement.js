const mongoose = require("mongoose");
const schema = new mongoose.Schema({ title:{type:String,required:true}, body:{type:String,required:true}, audience:{type:String,enum:["All","Employee","HR","Manager"],default:"All"}, author:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true} },{timestamps:true});
module.exports = mongoose.model("Announcement",schema);
