const Joi=require('joi');

const mongoose=require('mongoose');

//to get the ctegory from the category schema

const {categrySchema}=require('../model/categoriesModel');





const course=mongoose.model('Course',new mongoose.Schema({

title:{
    type:string,
    required:true,
    trim:true,
    
    maxlength:5,
    minlength:255

},
category:{
   type:categrySchema,
   required:true

},
creator:{
    type:Joi.string,
    required:true,

},
rating:{
    type:Number,
    required:true,

}
}));


function validateCourse(course){
    const schema={
        title:Joi.string().min(5).max(50).required(),
        categoryId:Joi.string().required(),
        creator:Joi.string().min(5).required(),
        rating:Joi.number().min(0).required()

    }
    return Joi.validate(course,schema);


};

exports.Course=Course 



exports.validate=validateCourse;