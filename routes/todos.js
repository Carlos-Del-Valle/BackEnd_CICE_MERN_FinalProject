const { Todo } = require("../models/todo")
// const auth = require("../middleware/auth")
const express = require("express")
const Joi = require("joi")

const router = express.Router()

router.get("/",async(req, res) => {
    try{
    const todos = await Todo.find()
        .sort({ date: -1 })
        //.select({ name: 1 })

        res.send(todos)
    } catch(error){
      res.status(500).send(error.message)
        console.log(error.message)
    }
})

router.post("/", async(req, res)=> {
    const schema = Joi.object({
        name: Joi.string().min(3).max(200).required(),
        author: Joi.string.min(3).max(30),
        uid: Joi.string(),
        isComplete: Joi.boolean(),
        date: Joi.date()
    }) //.options({ abortEarly:false }) //better error feedback on terminal

    const { error } = schema.validate(req.body)

    if(error) return res.status(400).send(error.details[0].message)

    const { name, author, isComplete, date, uid } = req.body

    let todo = new Todo({
        name,
        author,
        isComplete,
        date,
        uid

    })

    // Maybe it is better to use then?
    try {
        todo = await todo.save()
        res.send(todo)
    } catch(error){
        res.status(500).send(error.message)
        console.log(error.message);
    }

})

router.put("/:id", async(req, res) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(200).required(),
        author: Joi.string.min(3).max(30),
        uid: Joi.string(),
        isComplete: Joi.boolean(),
        date: Joi.date()
    }) //.options({ abortEarly:false }) //better error feedback on terminal

    const { error } = schema.validate(req.body)

    if(error) return res.status(400).send(error.details[0].message)

    try {

    const todo = await Todo.findById(req.params.id)

    if(!todo) return res.status(404).send("Todo not found...")

    const { name, author, isComplete, date, uid } = req.body


        const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, {
                name,
                author,
                isComplete,
                date,
                uid
            },
            {new: true})

        res.send(updatedTodo)
    } catch (error) {
        res.status(500).send(error.message)
        console.log(error.message)
    }

})

router.patch("/:id", async(req, res) => {

    try {
    const todo = await Todo.findById(req.params.id)

    if(!todo) return res.status(404).send("Todo not found")


        const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, {
            isComplete: !todo.isComplete
        }, {new: true})

        res.send(updatedTodo)
    } catch (error) {
        res.status(500).send(error.message)
        console.log(error.message)
    }
})

router.delete("/:id", async(req,res) => {
    // deleteOne()
    // deleteMany()
    // findByAndDelete()
    try {

    const todo = await Todo.findById(req.params.id)

    if(!todo) return res.status(404).send("Todo not found...")

        const deletedTodo = await Todo.findByIdAndDelete(req.params.id)

        res.send(deletedTodo)
    } catch(error){
        res.status(500) .send(error.message)
        console.log(error.message)
    }
})

module.exports = router