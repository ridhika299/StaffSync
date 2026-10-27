const router=require("express").Router();const Announcement=require("../models/Announcement");const {protect,allow}=require("../middleware/auth");router.use(protect);
router.get("/",async(req,res)=>{try{res.json(await Announcement.find({$or:[{audience:"All"},{audience:req.user.role}]}).populate("author","name").sort({createdAt:-1}));}catch(e){res.status(500).json({message:e.message});}});
router.post("/",allow("HR"),async(req,res)=>{try{const {title,body,audience}=req.body;res.status(201).json(await Announcement.create({title,body,audience,author:req.user._id}));}catch(e){res.status(400).json({message:e.message});}});
router.delete("/:id",allow("HR"),async(req,res)=>{try{await Announcement.findByIdAndDelete(req.params.id);res.json({message:"Announcement deleted"});}catch(e){res.status(400).json({message:e.message});}});
module.exports=router;
