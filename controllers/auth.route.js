const express = require('express');
const router = express.Router();
const auth = require("../users.auth");
const memberRepo = require("../repositories/member.repository");
const path = require('path');
const passport = require("passport")
const flash = require('express-flash')

router.get("/", loginRootAction);
router.get("/home", loginHomeAction)
router.post("/login",  passport.authenticate('local', {successRedirect: '/home', failureRedirect: '/auth/',failureFlash: true}));
router.get("/logout", logoutAction);
router.post("/signup", signupAction)

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
  async function signupAction(request, response){
    var email = request.body.email;
    var password = request.body.password;
    var confirmpsw = request.body.confirmpsw;
    var exist = await memberRepo.getOneMemberByEmail(email);
    if (exist.length === 0 && password === confirmpsw){
      var confirm = await memberRepo.signUpMemeber(email, password);
      if (confirm) {
        request.flash('success','Votre compte à été créé !');
      }else{
          request.flash('failure','Oups ! Une erreur est survenue !');
      }
    }else{
      request.flash('error','Oups ! Une erreur est survenue ! Vérifiez vos données !');
    }  
    const filePath = path.join(process.env.rootDirectory, "/views/pages/login.ejs");
    response.render(filePath);
    }
module.exports = router;