const AuthService = require("../Service/AuthService");
const { JWT_KEY } = require("./util");
const JwtStratergy = require("passport-jwt").Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;


const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: JWT_KEY,
}


const jwtStratergyForWebsite = new JwtStratergy(options, async (payload, done) => {
    console.log(payload, 'payload');
    try {

        const {username} = payload;
        const userFromDB = await AuthService.findUserByUserName(username);

        if(username && userFromDB) {
            return done(null, true); // login YES 
        } else {
            return done(null, false);
        } 
    } catch(error) {
        return done(error, false);
         // login NO 
    }
})


module.exports = (passport) => {
    passport.use(jwtStratergyForWebsite)
}