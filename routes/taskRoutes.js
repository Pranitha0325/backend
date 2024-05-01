// userRoutes.js

const express = require('express');
const router = express.Router();

const tasks = require("../models/taskSchema");


// Middleware function for handling GET request to /users
router.get('/allTasks', async (req, res) => {
    try {
        const allTasks = await tasks.find({ assignedTo: { $exists: true, $size: 0 } });
        res.send(allTasks);
        
    } catch (error) {
        console.log("Error fetching tasks:", error);
        res.status(500).json({ error: "Could not fetch tasks" });
    }
});


// Middleware function for handling POST request to /users
router.post('/create', async(req, res) => {
    const details = req.body 

    console.log(details, "details of the task s")
    const newTasks = await tasks.create(details)


    res.send(newTasks)
   
});

router.post('/allTasks/:id', async (req, res) => {
    const assignedUserEmails = req.body; // Assuming req.body is an array
    console.log(assignedUserEmails, "assigneduserEmails");
    console.log(req.params.id, "idofthetask")

    try {
        const update = { $set: { assignedTo: assignedUserEmails } };

       const updated =  await tasks.findByIdAndUpdate(req.params.id, update);

        res.status(200).send(updated);
    } catch (error) {
        console.error("Error updating task:", error);
        res.status(500).send("Internal Server Error.");
    }
});

router.get('/assignedTasks', async (req, res) => {
    try {
        const assignedTasks = await tasks.find({ assignedTo: { $exists: true, $not: { $size: 0 } } });
        res.send(assignedTasks);
        
    } catch (error) {
        console.log("Error fetching tasks:", error);
        res.status(500).json({ error: "Could not fetch tasks" });
    }
});

router.get('/completedTasks', async (req, res) => {
    try {
        const completedTasks = await tasks.find({ taskStatus:'completed' });
        console.log(completedTasks)
        res.send(completedTasks);
        
    } catch (error) {
        console.log("Error fetching tasks:", error);
        res.status(500).json({ error: "Could not fetch tasks" });
    }
});

router.get('/totalTasks', async (req, res) => {
    try {
        const allTasks = await tasks.find();
        console.log(allTasks)
        res.send(allTasks);
        
    } catch (error) {
        console.log("Error fetching tasks:", error);
        res.status(500).json({ error: "Could not fetch tasks" });
    }
});

router.post('/assignedTaskStatus/:id/:data', async (req, res) => {
     
    console.log(req.params.data, "assigneduserEmails");
    console.log(req.params.id, "idofthetask")

    try {
        const update = { $set: { taskStatus: req.params.data } };

       const updated =  await tasks.findByIdAndUpdate(req.params.id, update);

        res.status(200).send(updated);
    } catch (error) {
        console.error("Error updating task:", error);
        res.status(500).send("Internal Server Error.");
    }
});

module.exports = router;

