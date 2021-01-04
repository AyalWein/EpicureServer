import { Strategy as local } from 'passport-local';
import { Strategy as jwt } from 'passport-jwt';

const passport = require('passport');
// const LocalStrategy = require('passport-local').Srategy;
// const JwtStrategy = require('passport-jwt').Strategy;
const User = require('./models/Users');

const cookieExtractor = (req) => {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies["access_token"];
    }
    return token;
}


//Authorization with jwt
passport.use(new jwt({
    jwtFromRequest: cookieExtractor,
    secretOrKey: "MoveoHls",


}, (payload, done) => {
    User.findById({ _id: payload.sub }, (err, user) => {
        if (err) {
            console.log("err1");
            return done(err, false);
        }
        if (user) {
            console.log("err2");
            return done(null, user);
        }
        else {
            console.log("err3");
            return done(null, false);
        }

    });

}))

//Authentication local strategy using username and password
passport.use(new local((username, password, done) => {
    User.findOne({ username }, (err, user) => {
        //Databse connection error.
        if (err) {
            return done(err);
        }
        //User does not exist
        if (!user) {
            return done(null, false);
        }
        //check of password is correct
        user.comparePassword(password, done);

    })


}));