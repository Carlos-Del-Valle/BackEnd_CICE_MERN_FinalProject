const express = require('express');
const router = express.Router();
const bcrypt = require("bcryptjs");

//import _controllers
const { register, login, logout, getLoggedInUser } = require("../_controllers/user");
//import _middlewares
const {userRegisterValidator, userById} = require("../_middlewares/user")
const {verifyToken} = require("../_middlewares/auth")

//api _routers
router.post("/register", userRegisterValidator, register);
router.post("/login", login);
router.get("/logout", logout);

router.get('/user',
    verifyToken,
    userById,
    getLoggedInUser
);

module.exports = router;