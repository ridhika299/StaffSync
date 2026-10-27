const mongoose = require("mongoose");
const schema = new mongoose.Schema({ employee:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true}, type:{type:String,required:true}, startDate:{type:Date,required:true}, endDate:{type:Date,required:true}, reason:{type:String,required:true}, status:{type:String,enum:["Pending","Approved","Rejected"],default:"Pending"}, reviewedBy:{type:mongoose.Schema.Types.ObjectId,ref:"User"} },{timestamps:true});
module.exports = mongoose.model("Leave",schema);
