const mongoose=require('mongoose');


const Joi = require('joi');




const categrySchema=new mongoose.Schema({
    name:{type:String,required:true,minlength:3,maxlength:40
        //now we had to create a model


    }
})

  const Category= mongoose.model('Category',categrySchema);

  
function validateCategory(category) {
    const schema = Joi.object({
    name: Joi.string().min(3).required()
 });
    return schema.validate(category);
  }

  //so now we need to export it for the categories route to use this

  exports.Category=Category
  exports.validate=validateCategory
  //to get the category from the category schema we are exporting this
  exports.categrySchema=categrySchema;