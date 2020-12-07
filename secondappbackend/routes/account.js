const router = require('express').Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const { check } = require('express-validator');

const loginValidation = [
    check('username')
      .exists()
      .withMessage('username empty'),
    check('password')
      .exists()
      .withMessage('PASSWORD_IS_EMPTY')
  ];

router.post('/login', passport.authenticate('keystone'), 
    (req, res) => {
        const { user } = req;
        // console.log(user);
        const userToSend = {
            domain: user.domain.id,
            id: user.id,
            name: user.name,
            roles: user.roles,
            password: req.body.password
        }
        const jwtToken = jwt.sign({ user: userToSend }, 'do not need to know',         
            {
              expiresIn: 1000000,
            });
        const userToReturn = { ...userToSend, ...{ jwtToken } };
        res.status(200).json(userToReturn)
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
    if (req.isAuthenticated()) res.send(req.user.name);
    else res.sendStatus(401);
});

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});


function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated())
        next();
    else res.sendStatus(401);
}

module.exports=router;