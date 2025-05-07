const express = require("express");
const { HomeResponse } = require("./Controllers/HomeCOntroller");
const userData = require("./usersData");

const server = express();
const PORT = 8089;



// HOME ROUTE
server.get("/", HomeResponse);
server.get("/home", HomeResponse);

server.get("/contacts", (req, res) => {
    // send method is of EXPRESS not NODEJS 
    // Send behind the scenes is calling NODE JS end()
    // Send behind the scenes is doing JSON.Stringify()
    res.status(200).send("this is a contact page 8802746637 s");
});

server.get("/fitness", (req, res) => {
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




// ----------- ACTIVITY --------------
// ROUTES / API   (https://www.google.com/)
server.get("/v1/activity/users", (req, res) => {
    res.json(userData.data);
})


// query params (ex: https://www.google.com/search?q=virat, https://www.google.com/search?q=sachin)
// we want to get all the FEMALE USERS

server.get("/v1/activity/users/search", (req, res) => {
    const query = req.query;
    const searchedGender = query.gender;

    const filteredData = userData.data.filter(user => user.gender === searchedGender)
    res.json(filteredData);
})


// want to get only 1 user 
// way 1: query params 

// server.get("/v1/activity/users/search/user", (req, res) => {
//     const query = req.query;
//     const searchedFirstName = query.firstName;

//     const filteredData = userData.data.filter(user => user.name.first === searchedFirstName)
//     res.json(filteredData);
// })


// WAY 2: PARAMS (https://pokeapi.co/api/v2/pokemon/ditto, https://pokeapi.co/api/v2/pokemon/pikachu) -> only one part is variable

server.get("/v1/activity/users/search/user/:userName", (req, res) => {
    const params = req.params;
    const searchedFirstName = params.userName;

    const filteredData = userData.data.filter(user => user.name.first === searchedFirstName)
    res.json(filteredData);
})


server.listen(PORT, () => {
    console.log("THUMBS UP , Server is up at port :: " + PORT);
})
