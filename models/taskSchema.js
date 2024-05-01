const mongoose = require("mongoose"); 

const taskSchema =new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    mobileNumber : {
        type : Number,
        required : true   
    },
    email : {
        type : String,
        required : true
    },
    collage:{
        type:String,
        required:true
    },
    university:{
        type:String,
        required:true
    },
    passOutYear:{
        type:String,
        required:true
    },
    qualification:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    assignedTo:{type:Array},
    taskStatus:{type:String}
})

const tasks = mongoose.model("Tasks", taskSchema);
module.exports = tasks;