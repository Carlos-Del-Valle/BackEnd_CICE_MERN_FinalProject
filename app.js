// set up server
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();


// import  modules
const { json, urlencoded } = express;
const morgan = require("morgan");
const cors = require("cors");

const cookieParser = require("cookie-parser");
const expressValidator = require("express-validator");

// app
const app = express();

// db
mongoose
    .connect(process.env.MONGO_URI,{
        useNewURlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("DB CONNECTED"))
    .catch((err) => console.log("DB CONNECTION ERROR", err));

// middleware
app.use("auth", require("./routers/userRouter"));
app.use(morgan("dev"));
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(urlencoded({extended: false}));
app.use(cookieParser());
app.use(expressValidator());



// routers
const userRoutes = require("./routers/userRouter");
app.use("/", userRoutes);


// port
const port = process.env.PORT || 8080;

// listener
const server = app.listen(port, () =>
    console.log(`Server is running on port ${port}`));