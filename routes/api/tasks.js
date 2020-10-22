const express = require('express');
const router = express.Router();

// Import the transaction model
const Task = require('../../models/tasks');

// @route   GET api/tasks
// @desc    GET all tasks
// @access  Public
router.get('/', async (req,res) => {

    try{
        let tasks = await Task.find({});

        res.status(200).json({
            tasks,
        })
    }
    catch(err) {
        console.log(err);
        res.status(500).json({
            error: 'Could not get all tasks. Try again later.'
        })
    }
    
})

// @route   POST api/tasks
// @desc    Add a new task
// @access  Public
router.post('/', async (req,res) => {

    const {title} = req.body;
    if (!title){
        return res.status(400).json({
            error: "Please provide task title"
        })
    }
    try{
        const newTask = new Task({title});
        let transaction = await newTask.save();

        return res.status(200).json({
            transaction,
        })
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            error: 'Could not add a new transaction. Try again later.'
        })
    }
})

// @route   DELETE api/tasks/:taskId
// @desc    Delete transaction by id
// @access  Public
router.delete('/:taskId', async (req,res) => {

    const {taskId} = req.params;
    if (!taskId){
        return res.status(400).json({
            error: "Please provide taskId as query parameter"
        })
    }
    try{
        const result = await Task.findOneAndDelete({_id:taskId})
        if (!result) throw new Error("Can't find that task");
        return res.status(200).json({
            result,
        })
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            error: 'Could not delete that task. Try again later.'
        })
    }
})

module.exports = router;