// set up server
const express = require("express"); //
const app = express(); //

app.get("/", (req, res) => {
    res.send("WELCOME FURRO")
})

app.listen(5000, () =>{
    console.log("Server running on port 5000")
})



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
index.use("auth", require("./routers/userRouter"));
index.use(morgan("dev"));
index.use(cors({ origin: true, credentials: true }));
index.use(express.json());
index.use(urlencoded({extended: false}));
index.use(cookieParser());
index.use(expressValidator());



// routers
const userRoutes = require("./routers/userRouter");
index.use("/", userRoutes);


// port
const port = process.env.PORT || 8080;

// listener
const server = index.listen(port, () =>
    console.log(`Server is running on port ${port}`));


 */