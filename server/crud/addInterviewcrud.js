const addInterviewSchema = require("../controllers/addInterviewController")
const multer = require("multer")
// const upload = multer({ dest: '../public/upload' })


const storage = multer.diskStorage({
    destination:function(req,file,cb){
       cb(null,"./uploads");
    },
    filename:function(req,file,cb){
        cb(null,Date.now()+file.originalname)
    }
})

const upload = multer({storage:storage})
         
const createInterview = async(req,res)=>{
    console.log(req.file);
    console.log(req.body);
    const image = req.file ? req.file.filename : "";
    const baseurl = "http://localhost:3007/uploads/"
    const data = await addInterviewSchema.create({
            ...req.body,
            image:baseurl+image
    })
    const savedata = await data.save()
    res.json(savedata)
}

const getInterviews = async(req,res)=>{
    const InterviewData = await addInterviewSchema.find()
    if(!InterviewData){
        res.status(404)
    }
    else{
        res.status(200).json(InterviewData)
    }
}

const updateInterview = async(req,res)=>{
    console.log(req.body);
    const {int_id} = req.body
    const image = req.file ? req.file.filename : "";
    const baseurl = "http://localhost:3007/uploads/"
    const url = baseurl+image
    try{
    const update = await addInterviewSchema.findOneAndUpdate({_id:int_id},{...req.body,image:url},{new:true})
    res.json(update)
    console.log(update);
    }
    catch(err){
        res.json(err)
        console.log(err);
    }
}

const deleteInterview = async(req,res)=>{
    const {id} = req.params
    console.log(req.params);
     try{
    const deleteData = await addInterviewSchema.findOneAndDelete({_id:id})
    res.json(deleteData)
     }
     catch(err){
        res.json(err)
     }
}
module.exports = {createInterview,upload,getInterviews,updateInterview,deleteInterview}

