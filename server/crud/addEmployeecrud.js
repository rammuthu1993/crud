const addEmployeeSchema = require("../controllers/addEmployeeControll")
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
         
const createEmployee = async(req,res)=>{
    console.log(req.file);
    console.log(req.body);
    const {id} = req.body
    const image = req.file ? req.file.filename : "";
    const baseurl = "http://localhost:3007/uploads/"
    const exist = await addEmployeeSchema.findOne({id:id})
    if(exist){
        res.json(404)
    }
    else{
    const data = await addEmployeeSchema.create({
            ...req.body,
            image:baseurl+image
    })
    console.log(data);
    const savedata = await data.save()
    res.json(savedata)
}
}

const getEmployee = async(req,res)=>{
    const employeeData = await addEmployeeSchema.find()
    console.log(employeeData);
    if(!employeeData){
        res.status(404)
    }
    else{
        res.status(200).json(employeeData)
    }
}

const updateEmployee = async(req,res)=>{
    console.log(req.body.emp_id);
    const {id} = req.body
    const image = req.file ? req.file.filename : "";
    const baseurl = "http://localhost:3007/uploads/"
    const url = baseurl+image
    try{
    const update = await addEmployeeSchema.findOneAndUpdate({id:id},{...req.body,image:url},{new:true})
    res.json(update)
    console.log(update);
    }
    catch(err){
        res.json(err)
        console.log(err);
    }
}

const deleteEmployee = async(req,res)=>{
    const {id} = req.params
    console.log(req.params);
     try{
    const deleteData = await addEmployeeSchema.findOneAndDelete({_id:id})
    res.json(deleteData)
     }
     catch(err){
        res.json(err)
     }
}
module.exports = {createEmployee,upload,getEmployee,updateEmployee,deleteEmployee}

