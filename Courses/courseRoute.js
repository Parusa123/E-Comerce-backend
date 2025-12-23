const {Course,validate}=require('../model/courseModel');
const mongoose=require ('mongoose');
const express=require('express');
const { Category } = require('../model/categoriesModel');
//with the help of the Category modle we can have alll the category model



const { required } = require('joi');


const router=express.Router();


router.get('/',async(req,res)=>{
   let courseRouter= await Course.find();
   res.send()
});

router.post( '/',async(req,res)=>{
 const {error}=validate(req.body)
if(error) res.status(400).send(error.details[0].message)

    //for the Category
    const category=await Category.findById(req.body.categoryId)
    if(!category) return res.status(400).send('Invalid ID')

    let course=new Course({
        title:req.body.title,
        Category:{
            _id:category._id,
            name:category.name


        },
        creator:req.body.creator,
        rating:req.body.rating,

    })
    course=await course.save();
    
    res.send(course);

});



router.put('/:id',async(req,res)=>{

      const {error}=validate(req.body)
     if(error) res.status(400).send(error.details[0].message)

        //for the Category
    const category=await Category.findById(req.body.categoryId)
    if(!category) return res.status(400).send('Invalid ID')

    const course=await Course.findByIdAndUpdate(req.params.id,
     {
     
        title:req.body.title,
        Category:{
              _id:category._id,
            name:category.name

        },
        creator:req.body.creator,
        rating:req.body.rating,

    },{new:true});

    if(!course) return res.status(404).send('The course with the given ID was not found.');
    
  
res.send(course);

});

router.delete('/:id',async(req,res)=>{


 const course=await Course.findByIdAndDelete(req.params.id)
     

 if(!course) return res.status(404).send('The course with the given ID was not found.');

  
res.send(course);

});

router.get('/:id',async(req,res)=>{



 const course=await Course.findById(req.params.id)
     

 if(!course) return res.status(404).send('The course with the given ID was not found.');

  
res.send(course);

});


module.exports=router;








