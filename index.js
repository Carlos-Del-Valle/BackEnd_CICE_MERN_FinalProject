const todos = require("./routes/todos")
const signUp = require("./routes/signUp")
const signIn = require("./routes/signIn")

// set up server (remember that in node.js the use of module is still experimental)
const express = require("express")
const app = express()
const mongoose = require("mongoose")
require("dotenv").config()

const cors = require("cors")



/*const corsOptions = {
    origin: 'https://sharp-poitras-bece04.netlify.app',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
} */

const corsOptions ={
    origin:'https://sharp-poitras-bece04.netlify.app',
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}

app.use(cors(corsOptions))

//Middlewares (remember everything that uses .use is a middleware)
app.use(express.json())

//endpoints
app.use("/api/todos", todos)
app.use("/api/signup", signUp)
app.use("/api/signin", signIn)


app.get("/", (req, res) => {
    res.send("WELCOME FURRO")
})

const connection_string = process.env.CONNECTION_STRING
const port= process.env.PORT || 5000

app.listen(port, () =>{
    console.log(`Server running on port ${port}`)
})

mongoose.connect(connection_string, {
    useNewUrlParser:true,
    // useCreateIndex: true, DEPRECATED
    useUnifiedTopology: true,
    // useFindAndModify: false NOT SUPPORTED
})
    .then(()=> console.log("MongoDB connected!"))
    .catch((error) => console.error("MongoDB connection failed:", error.message))

