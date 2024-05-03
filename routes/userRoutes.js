// userRoutes.js

const express = require('express');
const router = express.Router();
const bcrypt = require("bcryptjs");
const saltRounds = 10;



const user = require("../models/userSchema");

router.get('/login/:email', async (req, res) => {
   
    
    console.log("getalltasks", req.params.email)
    try {
        const userDetails = await user.findOne({email:req.params.email });
        console.log(userDetails, "newuserdetails")
        res.send(userDetails);
        
    } catch (error) {
        console.log("Error fetching tasks:", error);
        res.status(500).json({ error: "Could not fetch tasks" });
    }
});


// Middleware function for handling POST request to /users
router.post('/signup', async(req, res) => {
    const details = req.body 

    console.log(details.details.name, "details of the task")


    const hashGenerate = async (plainpassword) => {
        try {
          const salt = await bcrypt.genSalt(saltRounds);
          const hash = await bcrypt.hash(plainpassword, salt);
          return hash;
        } catch (error) {
          return error;
        }
      };
    const hashPass = await hashGenerate(details.details.password);
    const userAlreadyExist = await user.findOne({ email: details.details.email });
    console.log(userAlreadyExist, "userAlreadyExists")
    const newUser = await user.create({
        name: details.details.name,
        email: details.details.email,
        password: hashPass,
      });
      console.log(newUser, "newuserDetails")
    res.send(newUser)
   
});

module.exports = router;

