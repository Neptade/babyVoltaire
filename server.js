const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config({path: '.env'});
const port = process.env.port;
const app = express();
const bodyParser = require("body-parser");
const session = require("express-session");
const initializePassport = require("./passport-config")
const passport = require("passport")
const flash = require('express-flash')

initializePassport(passport)

app.use(session({
    secret: "SecretRandomStringDskghadslkghdlkghdghaksdghdkshasdfasdfasdflkjhlkjahk",
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }, // 1 day in msec
    resave: false
}));
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

app.use(bodyParser.json(), bodyParser.urlencoded({ extended: true }));

app.listen(port, () => {
    console.log(`Listening for requests on port ${port}`)
})  

app.use(function(req, res, next) {
    res.locals.isAuthenticated = req.isAuthenticated();
    next();
});


app.get('/', (request, response) => { 
    const filePath = path.join(process.env.rootDirectory, "/views/pages/home.ejs")
    response.render(filePath)
});
app.use("/home", require("./controllers/home.route"));
app.use("/auth", require("./controllers/auth.route"));