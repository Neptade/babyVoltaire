const express = require('express');
const dotenv = require('dotenv');
dotenv.config({path: '.env'});
const port = process.env.port;
const app = express();
const mariadb = require('mariadb')



app.get('/', (request, response) => { 
    const filePath = path.join(env.rootDirectory)
    response.sendFile("home.html")
});

app.listen(port, () => {
    console.log(`Listening for requests on port ${port}`)
})