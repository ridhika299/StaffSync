const mongoose = require("mongoose");
const employeeSchema = new mongoose.Schema({ name:{type:String,required:true,trim:true}, email:{type:String,required:true,unique:true,lowercase:true,trim:true}, department:{type:String,required:true}, position:{type:String,required:true}, salary:{type:Number,required:true,min:0}, status:{type:String,enum:["Active","On Leave","Inactive"],default:"Active"}, user:{type:mongoose.Schema.Types.ObjectId,ref:"User",default:null} },{timestamps:true});
module.exports = mongoose.model("Employee", employeeSchema);
