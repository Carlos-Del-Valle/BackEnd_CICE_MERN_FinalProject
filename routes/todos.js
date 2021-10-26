const { Todo } = require("../models/todo")
const express = require("express")
const Joi = require("joi")

const router = express.Router()

router.get("/", async(req, res) => {
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

module.exports = router