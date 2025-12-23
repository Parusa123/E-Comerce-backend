const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/New' )
  .then(() => console.log('Connected successfully'))
  .catch(err => console.error('Connection error', err));


//schema
//schema is a blueprint for our data

//we are commenting the below code for the pirpose of learning bout data validation

// const courseSchema = new mongoose.Schema({  
//    name: String,
//    creator: String,
//    publishDate:{type:Date ,default:Date.now},

//    //default : date.now means if no date is provided it will take current date
//    isPublished: Boolean,
//    rating: Number
// })

//data validation

const courseSchema = new mongoose.Schema({  
   name: {type:String,required:true, minlength:5, maxlength:200},
   tags:{type:Array,validate:{
      validator:function(tags){
         return tags.length>1;
      }
   }}, 
   //tags is a custom validator in this case

   // tags is an array of strings useually used for categorizing the data
   //it is of two or more than 2 values
   category:{
   type:String,
   required:true,
   enum: ['DSA','Web',"Mobile','Data Science'] //only these values are allowed"]
   },

   //enum is used to restrict the value of a field to a specific set of values
   //minlength and maxlength is used to restrict the length of a string

   creator:{type:String,required:true},
   publishDate:{type:Date ,default:Date.now},

   //default : date.now means if no date is provided it will take current date
   isPublished: {type:Boolean,required:true},
   rating:{type:Number,required:function(){
   return this.isPublished}}

   })


//take schema as a class and model as an object
const Course = mongoose.model('Course', courseSchema);  
createCourse();




// async function createCourse(){
//    const course = new Course({
//       name: 'Python',
//       creator: 'Mother',
//       isPublished: false,
//       rating: 3.9
//    })


   
//    const result = await course.save();
//    // - This is a Mongoose method that saves the document to the database.
//    console.log(result);
// }

   //we have commented the above code for the purpose of learning about data validation


async function createCourse(){
   const course =  new Course({
      name: 'Subjects',
      tags:["maths","science"],
      //if only one tag is provided it will show an error
      category: 'Web', 
      creator: 'God',
      isPublished: true,
      rating:4.5
      //shows an error because required field is missing
      //now we will need a try catch block to catch the error
   })
   try{
      const result = await course.save()
      console.log(result);

      //to shorten it up we can do this
      //await course.validate();
   }catch(err){
      //for error validators we are commenting the below line
      //beacuse eroroe validators will show a lot of information
      //console.error(err.message);

      for(field in error.errors){
         console.log(error.errors[field]);
   }

   //this will show an error because the required fields are missing
   /*Course validation failed: isPublished: Path `isPublished` is required., creator: Path `creator` is required.
Connected successfully */
}
}


//    const result = await course.save();
//    // - This is a Mongoose method that saves the document to the database.
//    console.log(result);
// 


 //rating 0-5


//createCourse();

//compersion operator

//eq(equal)
//ne(not equal)
//gt(greater than)
//gte(greater than or equal to)
//lt(less than)
//lte(less than or equal to)
//in
//nin(not in)
//in and not is used to see a value in a range  

//we can use  this query operators using $ sign before the operator
//for example to find the course with rating greater than 4 we can use the below query
//Course.find({rating:{$gte:4}})

//Logical operator we have two logical operators
//or
//and
//we can use these operators using $ sign before the operator
//for example to find the course with rating greater than 4 and is published we can use the below query
//Course.find({$and:[{rating:{$gte:4}},{isPublished:true}]})


//first start the server using the command below
//mongod --dbpath ~/mongodb-data/db
//and then move to other terminal and run the file using
//npx nodemon idk.js

//to query a document from the databasee


//we are commenting the below to create the rating field in the document


async function getcourses(){
   //for best understanding we are commentiing this and creating this and finfing the course using the rating field likw in and noy in

   
   //const courses=await Course.find({creator:'partha pratim mahanta'}).select({name:1,publishDate:1}).sort({name:1});

   //const courses=await Course.find({rating:{$gte:4}}).select({name:1,publishDate:1}).sort({name:1});
   //or we can do this using in operator
   //using logical operator

   //const courses=await Course.find({rating:{$in:[3,4.5]}}).select({name:1,publishDate:1}).sort({name:1});

   //we can also do this using in operator




   //const courses=await Course.find({rating:{$in:[5]}}).select({name:1,publishDate:1}).sort({name:1});
   //sort method is used to sort the document in ascending or descending order
   //if we use sort({name:1}) it will sort in ascending order
   //if we use sort({name:-1}) it will sort in descending order
   //select method is used to select specific fields from the document

   //const courses=await Course.find({rating:{$in:[3.9,4.3,4.5]}}).select({name:1,publishDate:1}).sort({name:1}).or([{creator:'partha pratim mahanta'},{rating:2},]);
   //or will return the document if any of the condition is true
   //so if any any of the condition is true it will return the document
   //so as we can see i have decreased the rating to 2 so that it will return the document
   //using logical operator

   //Now for the and operator we can do this
   const courses=await Course.find({rating:{$in:[3.9,4.3,4.5]}}).select({name:1,publishDate:1}).sort({name:1}).and([{creator:'partha pratim mahanta'},{rating:4.5},]);
   //and will return the document if all the condition is true
   //so if all the condition is true it will return the document

   console.log(courses);
   
}


//now for updating purpose we are going to comment the getcourses method call
//getcourses();


async function updatedCourse(id){
   const course=await Course.findById(id);
   if(!course) return;

   course.name='python updated';
   course.creator='pMp'

   const fornow=await course.save();
   console.log(fornow);
}

//updating document

//updatedCourse('68fa56d7106e7870d7089a34')


//Delete document

async function Deletedouc(id){
   let course=await Course.findByIdAndDelete(id);
   console.log(course);
}

//Deletedouc('68fa56ab492b2390a975a873')

//Database validation error
//createCourse();