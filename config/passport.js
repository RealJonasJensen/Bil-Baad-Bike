const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const Bruger = require("../models/brugere");
const keys = require("./keys");
const passport = require("passport");

const options = {};
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = keys.secretKey;

module.exports = passport => {
    passport.use(
        new JwtStrategy(options, (jwt_payload, done) => {
            Bruger.findById(jwt_payload.id)
                .then(bruger => {
                    if (bruger) {
                        return done(null, bruger);
                    }
                    return done(null, false)
                })
                .catch(err => console.log(err))
        })
    );
};