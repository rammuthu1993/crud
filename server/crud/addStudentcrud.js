const addStudentSchema = require("../controllers/addStudentsConroller")
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
         
const createStudent = async(req,res)=>{
    console.log(req.file);
    console.log(req.body);
    const image = req.file ? req.file.filename : "";
    console.log(image);
    
    const baseurl = "http://localhost:3007/uploads/"
    console.log(baseurl+image);
    
    const data = await addStudentSchema.create({
            ...req.body,
            image:baseurl+image

            
    })
    const savedata = await data.save()
    res.json(savedata)
}

const getStudents = async(req,res)=>{
    const studentData = await addStudentSchema.find()
    if(!studentData){
        res.status(404)
    }
    else{
        res.status(200).json(studentData)
    }
}

const updateStudent = async(req,res)=>{
    console.log(req.body);
    const {id} = req.body
    const image = req.file ? req.file.filename : "";
    const baseurl = "http://localhost:3007/uploads/"
    const url = baseurl+image
    try{
    const update = await addStudentSchema.findOneAndUpdate({id:id},{...req.body,image:url},{new:true})
    res.json(req.body)
    console.log(update);
    }
    catch(err){
        res.json(err)
        console.log(err);
    }
}

const deletestudent = async(req,res)=>{
    const {id} = req.params
    console.log(req.params);
     try{
    const deleteData = await addStudentSchema.findOneAndDelete({_id:id})
    res.json(deleteData)
     }
     catch(err){
        res.json(err)
     }
}
module.exports = {createStudent,upload,getStudents,updateStudent,deletestudent}

