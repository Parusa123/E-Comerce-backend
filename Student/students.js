//for msking the students api we will need this file

const e = require('express');
const express=require('express');

const {Student,validate}=require('../model/studentModel')

//we had to use mongoose here also becuz using mongose we can build schema


//we are commenting this  beacause we dont need this here we have a dif file or studentModel

// const mongoose=require('mongoose');


// const Joi = require('joi');

//we are using joi for data validation purposes
//joi is used in data base level and expresss is used in data level


const router=express.Router();
//this method is used to create a new router object
//it will help us to create modular, mountable route handlers
//now we can change the app to use this router object


//we are commenting this bcuz we have diff file for it now


// const studentSchema=new mongoose.Schema({
//     name:{type:String,required:true,minlength:3,maxlength:40},
//         //now we had to create a model
//         //a student can have  multiple properties
//     isEnrolled:{
//         type:Boolean,
//         default:false

//     },

//     Phone:{
//         type:string,
//         required:true,
//         minlength:10,
//         maxlength: 25
//     }
// })

//   const Student= mongoose.model('Student',studentSchema);

  
   router.get('/',async(req,res)=>{
   let students= await Student.find();
   res.send(students)
});


    router.post( '/',async(req,res)=>{

    //now we can change the validateStudent to validate only as we have the diff moduke file for the students

    const {error}=validate(req.body)
    if(error) res.status(400).send(error.details[0].message)
    const student=new student({
       name:req.body.name,
       isEnrolled:req.body.isEnrolled,
       Phone:req.body.Phone
    });
    await student.save();
    res.send(student)
    
});


router.put('/:id',async(req,res)=>{

      const {error}=validate(req.body)
     if(error) res.status(400).send(error.details[0].message)

    const student=await Student.findByIdAndUpdate(req.params.id,{name:req.body.name,Phone:req.body.Phone,isEnrolled:req.body.isEnrolled},{new:true});

  

    //here new object is used to get the new updated data

    if(!student) return res.status(404).send('The Student with the given ID was not found.');
    
  
    res.send(student);
});




router.delete('/:id',async(req,res)=>{
    const student=await Student.findByIdAndDelete(req.params.id);

    if(!student) return res.status(404).send('The student with the given ID was not found.');
    
    
    //splice method will remove that item from the array
    //splice method will remove the item at the given index
    
    res.send(student);
});


router.get('/:id',async(req,res)=>{
    const student=await Student.findById(req.params.id);
    if(!student) return res.status(404).send('The student with the given ID was not found.');
     res.send(student);
});



//we are comenting this method since we have diff file studentmodel for it

// function validateStudent(category) {
//     const schema = Joi.object({
//         name: Joi.string().min(3).max(50).required(),
//         Phone:Joi.string().min(10).max(50).required(),
//         isEnrolled:Joi.boolean()

//     });
//     return schema.validate(student,schema);

// }




module.exports=router;
