const passport = require("passport");
const memberRepo = require("./repositories/member.repository");

module.exports = {
  initialization(app) {
    app.use(passport.initialize());
    app.use(passport.session());
    passport.serializeUser(function (user, done) {
      done(null, user.username);
    });
    passport.deserializeUser(async function (username, done) {
      let user = await usersRepo.getOneUser(username);
      done(null, user);
    });
  },

  checkAuthentication() {
    return function (request, response, next) {
      if (request.isAuthenticated()) {
        return next();
      }
      else {
        return response.redirect("/auth/");
      }
    }
  }
};