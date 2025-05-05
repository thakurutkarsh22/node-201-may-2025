const http = require("node:http");
const PORT = 8088;

const server = http.createServer( (req, res) => {

    const url = req.url;
    console.log("url to debug", url);

    if(url === "/") {
        //  home page handling 
        res.write("Hey welcome ");
        res.write("utkarsh");
        res.end();  // string 

    } else if(url === "/contacts") {
        res.end("this is a contact page 8802746637");
    } else if (url === "/fitness") {
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
    }





});


server.listen(PORT, () => {
    console.log("THUMBS UP , Server is up at port :: " + PORT);
})