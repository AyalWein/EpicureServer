import { Strategy as local } from 'passport-local';
import { Strategy as jwt } from 'passport-jwt';
import { ExtractJwt } from 'passport-jwt';
var cookies = require("cookie-parser");

const passport = require('passport');
// const LocalStrategy = require('passport-local').Srategy;
// const JwtStrategy = require('passport-jwt').Strategy;
const User = require('./models/Users');

const cookieExtractor = req => {

    if (req && req.cookies) {
        const token = req.cookies["access_token"];
        console.log("token is: " + token);
        return token
    }
    else {
        console.log("no token found");
        return null;
    }

}


passport.use(new jwt({
    jwtFromRequest: cookieExtractor,
    secretOrKey: "MoveoHls"
}, (payload, done) => {
    User.findById({ _id: payload.sub }, (err, user) => {
        if (err) {

            return done(err, false);
        }
        if (user) {

            return done(null, user);
        }
        else {

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