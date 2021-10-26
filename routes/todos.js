const { Todo } = require("../models/todo")
const express = require("express")

const router = express.Router()

router.post("/", async(req, res)=> {

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