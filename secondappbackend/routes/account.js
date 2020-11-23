const express = require('express');
const router = express.Router();
const passport = require('passport');

router.post('/login',
    passport.authenticate('keystone', { failureRedirect: '/login' }), (req, res) => {
        console.log(req.user);
        res.redirect('/');
    }
);

// need for user info retrieval
/*router.get('/info', function (req, res) {
    if (req.isAuthenticated())
        res.send(req.user);
    else
        res.sendStatus(401);
});*/

router.get('/checkLogin', function (req, res) {
    console.log(Object.keys(req));
    console.log(req.user);
    if (req.isAuthenticated())
        res.sendStatus(200);
    else res.sendStatus(401);
});

router.get('/notLoggedIn', function (req, res) {
    if (req.isUnauthenticated())
        res.sendStatus(200);
    else res.sendStatus(400);
});

router.get('/info', (req, res) => {
    if (req.isAuthenticated()) res.send(req.user.name);
    else res.sendStatus(401);
});

router.get('/logout', ensureAuthenticated, (req, res) => {
    req.logout();
    res.redirect('/');
});


function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated())
        next();
    else res.sendStatus(401);
}

module.exports=router;