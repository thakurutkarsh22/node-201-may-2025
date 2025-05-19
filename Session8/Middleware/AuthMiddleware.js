
const MT_SECRET_PASSWORD = "asdf1234"

function AuthMiddleware(req, res, next)  {
    const header = req.headers;
    const authorization = header.authorization; // asdf1234

    // Middleware is checking if req is good.
    if(authorization === MT_SECRET_PASSWORD) {
        next()
    } else {
        res.status(429).json({message: "please provide with correct password !!AuthMiddleware"})
    }

}

module.exports = AuthMiddleware