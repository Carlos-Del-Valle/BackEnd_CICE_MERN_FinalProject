// function
// does the token exist?
// verify the token
// next()

const jwt = require("jsonwebtoken")

// function
function auth(req, res, next){

    // does the token exist?
    const token = req.header("x-auth-token")
    if(!token) return res.status(401).send("Not authorized")

    // verify the token
    try{
        const secretKey = process.env.SECRET_KEY
        const payload = jwt.verify(token, secretKey)
        req.user = payload
        next()
    } catch (error){
        res.status(400).send("Invalid token")
    }

}

module.exports = auth

/*

const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res , next) => {
    let accessToken = req.cookies.jwt;

    //if there is no token in the cookies, request is unauthorized
    if (!accessToken) {
        return res.status(403).json({
            error: "Unauthorized",
        });
    }

    let payload;
    try {
        // verify the token jwt.verify
        // throws an error if token has expired or has an invalid signature
        payload = jwt.verify(accessToken, proccess.env.JWT_SECRET);
        req._id = payload._id;

        next();
    } catch (e) {
        // return req unauthorized error
        return res.status(403).json({
            error: "Unathourized",
        });
    }

};

 */