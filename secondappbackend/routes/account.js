const router = require('express').Router();
const passport = require('passport');

router.post('/login',
    passport.authenticate('keystone', { failureRedirect: '/login' }),
    (req, res) => {
        // res.redirect('/')
        res.json({status: 'success', roles: req.user.roles })
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
    if (req.isAuthenticated()) {
        const user = req.user;
        const userinfo = {
            domain: user.domain,
            id: user.id,
            name: user.name,
            roles: user.roles,
            default_project_id: user.default_project_id,
            default_project_name: user.default_project_name
        };
        res.send(userinfo);

    }
    else res.sendStatus(401);
});

router.get('/logout', ensureAuthenticated, (req, res) => {
    req.logout();
    // res.redirect('/');
    res.json({status: 'success'});
});


function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated())
        next();
    else res.sendStatus(401);
}

module.exports=router;