const express = require("express");
const dotenv = require("dotenv");
dotenv.config(); // is loading all my secrets from .env file to process.env

const UserActivityRouter = require("./Routes/UserActivityRoutes");
const BlogsRouter = require("./Routes/BlogRoutes");

const { getAllUser, getUserByGender, getUserByUserName } = require("./Controllers/UserActivityController");
const { HomeResponse } = require("./Controllers/HomeCOntroller");
const AuthMiddleware = require("./Middleware/AuthMiddleware");
const { default: mongoose } = require("mongoose");

const server = express();
const PORT = process.env.PORT;



// MIDDLEWARE THAT WORK FOR EVERY REQUEST
// any request that arrive in my server should be parsed (bec we need the body)
// if I do not give any path like server.get("/",), it means it will work for EVERY REQUEST
server.use(express.json()) // express.json() - Returns middleware that only parses json
// this line is converting string BODY to Object so that node can play


const MT_SECRET_PASSWORD = process.env.MT_SECRET_PASSWORD;


// HOME ROUTE
server.get("/", (req, res, next) => {
    const header = req.headers;
    const authorization = header.authorization; // asdf1234

    // Middleware is checking if req is good.
    if(authorization === MT_SECRET_PASSWORD) {
        next()
    } else {
        res.status(429).json({message: "please provide with correct password !!AuthMiddleware 1"})
    }

},  HomeResponse);



server.get("/home", HomeResponse);

server.get("/contacts", (req, res) => {
    res.status(200).send("this is a contact page 8802746637 s");
});

server.get("/fitness", (req, res, next) => {
    const dietChart = {
        name: "utkarsh",
        heigh: 174,
        weight: 70,
        age:27,
        diet: ["eggs", "chicken", "curd"],
        gymAddress: {
            street: "1010",
            houseNumber: "100"
        },
        shouldSleep8Hours: false,
        createdDate: new Date().toDateString(),
    }

    // json () behind the scenes is doing  { "content-type": "application/json" }
    res.status(201).json(dietChart);
});

server.use("/v1/activity/users",  UserActivityRouter)




// I AM SUPPORTING A NEW FEATURE - MY BUSINESS is not venturing as a blogs website.

// mobile
server.use("/api/v1/blog", BlogsRouter)

// // Desktop
// server.use("/api/v2/blog", )



mongoose.connect("mongodb://localhost:27017/Crio2").then(() => {
    console.log("DATABASE IS UP")
}, (error) => {
    console.log("ERROR IN DATABASE CONNECTION", error)
}
).catch(error => {
    console.log("ERROR IN DATABASE CONNECTION")
})


server.listen(PORT, () => {
    console.log("THUMBS UP , Server is up at port :: " + PORT);
})
