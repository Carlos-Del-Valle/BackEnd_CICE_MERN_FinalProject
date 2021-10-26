const express = require('express');
const router = express.Router();
const bcrypt = require("bcryptjs");

//import controllers
const { register, login, logout, getLoggedInUser } = require("../controllers/user");
//import middlewares
const {userRegisterValidator, userById} = require("../middlewares/user")
const {verifyToken} = require("../middlewares/auth")

//api routers
router.post("/register", userRegisterValidator, register);
router.post("/login", login);
router.get("/logout", logout);

router.get('/user',
    verifyToken,
    userById,
    getLoggedInUser
);

module.exports = router;