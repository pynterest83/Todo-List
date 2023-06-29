const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async (req, res, next) => {
    // get token from header
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(" ")[1];
        // verify token
        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
            if (err) {
                res.status(401);
                throw new Error("Not authorized, token failed");
            }
            // if token is valid, set req.user to decoded.user
            req.user = decoded.user;
            next()
        });

        if (!token){
            res.status(401);
            throw new Error("Not authorized, no token");
        }
    }
})

module.exports = validateToken;