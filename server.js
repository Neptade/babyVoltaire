const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config({path: '.env'});
const port = process.env.port;
const app = express();
const mariadb = require('mariadb');





app.get('/', (request, response) => { 
    const filePath = path.join(process.env.rootDirectory, "home.html")
    response.sendFile(filePath)
});

app.listen(port, () => {
    console.log(`Listening for requests on port ${port}`)
})  



app.use("/home", require("./controllers/home.route"));