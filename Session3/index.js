const express = require("express");
const dotenv = require("dotenv");
dotenv.config(); // is loading all my secrets from .env file to process.env

const UserActivityRouter = require("./Routes/UserActivityRoutes");

const { getAllUser, getUserByGender, getUserByUserName } = require("./Controllers/UserActivityController");
const { HomeResponse } = require("./Controllers/HomeCOntroller");
const AuthMiddleware = require("./Middleware/AuthMiddleware");

const server = express();
const PORT = process.env.PORT;


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
    // send method is of EXPRESS not NODEJS 
    // Send behind the scenes is calling NODE JS end()
    // Send behind the scenes is doing JSON.Stringify()
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



// use -> supports all types of REQUEST METHODS (get, post, put , delete .....  )
server.use("/v1/activity/users",  UserActivityRouter)



// - - - - - - - - INSTEAD OF USING BELOW 3 API we use THE ABOVE LINE - - - - - - - - -
// server.get("/v1/activity/users", getAllUser)
// server.get("/v1/activity/users/search", getUserByGender)
// server.get("/v1/activity/users/search/user/:userName", getUserByUserName)


server.listen(PORT, () => {
    console.log("THUMBS UP , Server is up at port :: " + PORT);
})
