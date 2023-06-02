const User = require('../models/User');
const passport = require('passport');
const config = require('config');

//Webtoken strategy  JWT
const jwtStrategy = require('passport-jwt').Strategy;
const extractJwt = require('passport-jwt').ExtractJwt;
const jwtOptions = {
    jwtFromRequest: extractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET||config.get('jwt.secret')
};

passport.use(new jwtStrategy(jwtOptions, async (payload, done) => {
    try {
        const user = await User.findOne({_id: payload.id});
        if(!user) {
            return done(null, false);
        }
        done(null, user);
    } catch (error) {
        done(error, false);
    }
}));

module.exports = passport;


