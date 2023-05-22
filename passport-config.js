const { authenticate } = require("passport")
const memberRepo = require("./repositories/member.repository");


const localStrategy = require("passport-local").Strategy

async function initialize(passport){
    const authenticateUser= async (email, password, done) =>{
        const user = await memberRepo.getOneMemberByEmail(email)
        try{
            if(await memberRepo.areValidCredentials(email,password)){
                return done(null, user)
            }
            else{
                return done(null, false, {message: 'email ou mot de pass incorrect'})
            }
        }
        catch (e) {
            return done(e)
        }
    }
    passport.use(new localStrategy({ usernameField: "email"}, authenticateUser))
    passport.serializeUser((user, done) => done(null, user[0].mID))
    passport.deserializeUser((mID, done) => { return done(null, memberRepo.getOneMembre(mID))})
}

module.exports = initialize