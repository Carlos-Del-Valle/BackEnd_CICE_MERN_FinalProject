const todos = require("./routes/todos")

// set up server (remember that in node.js the use of module is still experimental)
const express = require("express")
const app = express()
const mongoose = require("mongoose")
const cors = require("cors")

require("dotenv").config()

//Middlewares (remember everything that uses .use is a middleware)
app.use(cors())
app.use(express.json())

app.use("/api/todos", todos)


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

/*
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();


// import  modules
const { json, urlencoded } = express;
const morgan = require("morgan");
const cors = require("cors");

const cookieParser = require("cookie-parser");
const expressValidator = require("express-validator");

// index
const index = express();

// db
mongoose
    .connect(process.env.MONGO_URI,{
        useNewURlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("DB CONNECTED"))
    .catch((err) => console.log("DB CONNECTION ERROR", err));

// middleware
index.use("auth", require("./_routers/userRouter"));
index.use(morgan("dev"));
index.use(cors({ origin: true, credentials: true }));
index.use(express.json());
index.use(urlencoded({extended: false}));
index.use(cookieParser());
index.use(expressValidator());



// _routers
const userRoutes = require("./_routers/userRouter");
index.use("/", userRoutes);


// port
const port = process.env.PORT || 8080;

// listener
const server = index.listen(port, () =>
    console.log(`Server is running on port ${port}`));


 */