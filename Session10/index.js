const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const UserActivityRouter = require("./Routes/UserActivityRoutes");
const BlogsRouter = require("./Routes/BlogRoutes");
const AuthRouter = require("./Routes/AuthRoutes");


const { HomeResponse } = require("./Controllers/HomeCOntroller");
const { default: mongoose } = require("mongoose");
const configPassport = require("./Config/passport");
const passport = require("passport");
const server = express();
const PORT = process.env.PORT;
const cors = require("cors");

server.use(cors()) // this line allows all the CLients in the world to connect to my server 


configPassport(passport); // through this line my application (backend) knows how many stratergies for login I am using 



server.use(express.json())



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


// routes for signup and login 
server.use("/v1/api/auth", AuthRouter)



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
