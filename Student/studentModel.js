const mongoose=require('mongoose');


const Joi = require('joi');




const studentSchema=new mongoose.Schema({
    name:{type:String,required:true,minlength:3,maxlength:40},
        //now we had to create a model
        //a student can have  multiple properties
    isEnrolled:{
        type:Boolean,
        default:false

    },

    Phone:{
        type:String,
        required:true,
        minlength:10,
        maxlength: 25
    }
})

  const Student= mongoose.model('Student',studentSchema);

function validateStudent(category) {
    const schema = Joi.object({
        name: Joi.string().min(3).max(50).required(),
        Phone:Joi.string().min(10).max(50).required(),
        isEnrolled:Joi.boolean()

    });
    return schema.validate(student,schema);

}


exports.Student=Student
exports.validate=validateStudent;