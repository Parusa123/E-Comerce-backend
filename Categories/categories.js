
const e = require('express');
const express=require('express');

//from categoriesModel file

const {Category,validate}=require('../model/categoriesModel')

//we had to use mongoose here also becuz using mongose we can build schema

// const mongoose=require('mongoose');


// const Joi = require('joi');

//we are using joi for data validation purposes
//joi is used in data base level and expresss is used in data level


const router=express.Router();
//this method is used to create a new router object
//it will help us to create modular, mountable route handlers
//now we can change the app to use this router object

//we will be writing this in a good file for a code code so now we will be commenting the below

// const categrySchema=new mongoose.Schema({
//     name:{type:String,required:true,minlength:3,maxlength:40
//         //now we had to create a model


//     }
// })

//   const Category= mongoose.model('Category',categrySchema);

  //so now we do not need our category array

// const category=[
//     {id:1,name: 'Web'},
//     {id:2,name: 'Mobile'},
//     {id:3,name: 'Photography'},

// ]
//now we can use our module to put,post.get,crete the data

//now we need to make some changes to oour CRUD operations

//  //after commenting the array

//router.get('/api/categories',(req,res)=>{
// // res.send(category); 
   //router.get('/api/categories',async(req,res)=>{

    //it was set as default api so we just need to use the slash now
    
router.get('/',async(req,res)=>{
let categories= await Category.find();
   res.send(categories)
});


// router.post( '/api/categories',(req,res)=>{
    
        //now we will do some changes here also


    // const {error}=validateCategory(req.body)
    // if(error) res.status(400).send(error.details[0].message)
    // const newCategory={
    //     id:category.length +1,
    //     name:req.body.name
    // };
    // category.push(newCategory);
    // res.send(newCategory);
    
    router.post( '/',async(req,res)=>{
        //after using the categories module we can now chang the validateCategory to validate only


    const {error}=validate(req.body)
    if(error) res.status(400).send(error.details[0].message)
    const newCategory=new Category({
       name:req.body.name
    });
    await newCategory.save();
    res.send(newCategory)
    

});

//put method before  reconstracting


// router.put('/api/categories/:id',(req,res)=>{
//     const categoryItem=category.find(c=>c.id===parseInt(req.params.id));
//     if(!categoryItem) return res.status(404).send('The category with the given ID was not found.');
    
//     categoryItem.name=req.body.name;    
//     res.send(categoryItem);
// });

//put method after construction

router.put('/:id',async(req,res)=>{

      const {error}=validate(req.body)
     if(error) res.status(400).send(error.details[0].message)

    const categoryItem=await Category.findByIdAndUpdate(req.params.id,{name:req.body.name},{new:true});

  

    //here new object is used to get the new updated data

    if(!categoryItem) return res.status(404).send('The category with the given ID was not found.');
    
  
    res.send(categoryItem);
});


//Delete method before reconstruction


// router.delete('/api/categories/:id',(req,res)=>{
//     const categoryItem=category.find(c=>c.id===parseInt(req.params.id));
//     if(!categoryItem) return res.status(404).send('The category with the given ID was not found.');
    
//     const index=category.indexOf(categoryItem);
//     //indexOf method will give the index of that particular item
//     category.splice(index,1);
//     //splice method will remove that item from the array
//     //splice method will remove the item at the given index
    
//     res.send(categoryItem);
// });


//Delete method after the construction

router.delete('/api:id',async(req,res)=>{
    const categoryItem=await Category.findByIdAndDelete(req.params.id);

    if(!categoryItem) return res.status(404).send('The categoryItem with the given ID was not found.');
    
    
    //splice method will remove that item from the array
    //splice method will remove the item at the given index
    
    res.send(categoryItem);
});


//get method before reconstructing 


// router.get('/api/categories/:id',(req,res)=>{
//     const categoryItem=genres.find(c=>c.id===parseInt(req.params.id));
//     if(!categoryItem) return res.status(404).send('The category with the given ID was not found.');
    
//     res.send(categoryItem);
// });



router.get('/:id',async(req,res)=>{
    const categoryItem=await Category.findById(req.params.id);
    if(!categoryItem) return res.status(404).send('The categoryItem with the given ID was not found.');
     res.send(categoryItem);
});

//we will be placing the function ina different file

// function validateCategory(category) {
//     const schema = Joi.object({
//         name: Joi.string().min(3).required()
//     });
//     return schema.validate(category);
// }

//now we can use this function in any of our routes
//we are using this in our post method
//whenever we are posting we are sending data



module.exports=router;
// so now we need to call this router in our app.js
//we will have more routes like for students teachers etc
