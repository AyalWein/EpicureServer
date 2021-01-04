import express = require('express');
import passport = require('passport');
const userRouter = express.Router();
//const passport = require('passport');
const passportConfig = require('../../passport');
const JWT = require('jsonwebtoken');



const sighToken = (userID) => {
    return JWT.sign({
        iss: "MoveoHls",
        sub: userID
    }, "MoveoHls", { expiresIn: "1h" });
}



//User model
const User = require('../../models/Users');

//Create a new user
userRouter.post('/register', (req, res) => {
    const { username, password, role } = req.body;
    User.findOne({ username }, (err, user) => {
        if (err) {
            res.status(500).json({ message: { msgBody: "Error has occured1", mesgError: true } });
        }
        if (user) {
            res.status(400).json({ message: { msgBody: "Username is already exist", mesgError: true } });
        }
        else {
            const newUser = new User({ username, password, role });
            newUser.save(err => {
                if (err) {
                    res.status(500).json({ message: { msgBody: "Error has occured2" + err, mesgError: true } });

                }
                else {
                    res.status(201).json({ message: { msgBody: "Account created successfully", mesgError: false } });
                }
            });
        }

    });
});


userRouter.post('/login', passport.authenticate('local', { session: false }), (req: any, res) => {
    if (req.isAuthenticated()) {
        const { _id, username, role } = req.user;
        const token = sighToken(_id);
        res.cookie('access_token', token, { httpOnly: true, sameSite: true });
        res.status(200).json({ isAuthenticated: true, user: { username, role } });

    }

});

userRouter.get('/logout', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.clearCookie('access_token');
    res.json({ user: { username: " ", role: " " }, success: true });
});

// userRouter.get('/logout', passport.authenticate('jwt', { session: false }),
//     function (req, res) {
//         res.clearCookie('access_token');
//         res.json({ user: { username: " ", role: " " }, success: true });
//     }
// );


module.exports = userRouter;