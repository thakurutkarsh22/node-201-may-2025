const http = require("node:http");
const PORT = 8088;

const server = http.createServer( (req, res) => {

    const url = req.url;
    const method = req.method;
    console.log("url to debug", url);

    if(url === "/") {
        //  home page handling 

        if(method === "GET") {
            res.write("Hey welcome ");
            res.write("utkarsh");
            res.end();  // string  -> LAST WRITE AND ENDS THE RESPONSE
        } else {
            res.writeHead(405, { "content-type": "application/json" } );
            res.end(JSON.stringify({message: "method not allowed"}));
        }

        

    } else if(url === "/contacts") {
        res.writeHead(201, { "content-type": "application/json" } );
        res.end("this is a contact page 8802746637");
    } else if (url === "/fitness") {

        if(method === "GET") {
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
    
            res.writeHead(201, { "content-type": "application/json" } );
            res.end(JSON.stringify(dietChart));
        } else {
            res.writeHead(405, { "content-type": "application/json" } );
            res.end(JSON.stringify({message: "method not allowed"}));
        }
        
    }





});


server.listen(PORT, () => {
    console.log("THUMBS UP , Server is up at port :: " + PORT);
})


// If I code in NodeJS
// 1. all the routes has to be inside index.js.
// 2. Do not repeat yourself. -> this principle is voilated somehow.
// 3. node js is more verbos (we have to write a lot of code to do little things)
