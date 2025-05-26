
const MT_SECRET_PASSWORD = "asdf1234"
const jwt = require("jsonwebtoken");
const JWT_KEY = "asfjgfadjfglaskjfghlasjkfglaskjfghlasjfgasdljhfgadskjhfgas"

function AuthMiddleware(req, res, next)  {
    const header = req.headers;
    const authorization = header.authorization; // bearer token
    const token = authorization.split(" ")[1]; // xyzzz

    if(!token) {
        res.status(401).json({message: "please login !"});
    } else {
        // 1. verift the token
        jwt.verify(token, JWT_KEY, (err, decodedJWTTOken) => {
            console.log("decodedJWTTOken", decodedJWTTOken);
            if(err) {
                res.status(401).json({message: "please re-login !"});
            } else {
                next();
            }
        })
    }

}

module.exports = AuthMiddleware


// JWT token ? 