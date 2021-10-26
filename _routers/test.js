const express = require("express");
const router = express.Router();

// import _controllers
const { getTest } = require("../_controllers/test");
// import  _middlewares

// api _routers
router.get("/test", getTest);


module.exports = router;
