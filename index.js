const express = require("express")
const cors = require("cors")
const app = express()

const todos = require("./routes/todos")
const signUp = require("./routes/signUp")
const signIn = require("./routes/signIn")

// set up server (remember that in node.js the use of module is still experimental)
const mongoose = require("mongoose")
require("dotenv").config()


/* const corsOptions = {
    origin: 'https://sharp-poitras-bece04.netlify.app',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
} */

const whitelist = ['https://sharp-poitras-bece04.netlify.app']
const corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}

app.use(cors(corsOptions))

/* app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    if (req.method === 'OPTIONS') {
        req.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
}); */

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

