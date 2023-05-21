const express = require('express');
const router = express.Router();
const auth = require("../users.auth");
const memberRepo = require("../repositories/member.repository");
const path = require('path');
const passport = require("passport")
const flash = require('express-flash')

router.get("/", loginRootAction);
router.get("/home", loginHomeAction)
router.post("/login",  passport.authenticate('local', {successRedirect: '/home', failureRedirect: '/login'}));
router.get("/logout", logoutAction);

function loginRootAction(request, response){
  const filePath = path.join(process.env.rootDirectory, "/views/pages/login.ejs")
  response.render(filePath)
}

function loginHomeAction(request, response){
  const filePath = path.join(process.env.rootDirectory, "/views/pages/home.ejs")
  response.render(filePath)
}
  
function logoutAction(request, response) {
    request.logout(function(err) {
        if (err) { return next(err); }
        response.redirect('/home');
    });
}
  
module.exports = router;