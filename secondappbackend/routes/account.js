const router = require('express').Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const { check } = require('express-validator');
const endpoint = 'http://183.111.177.141/identity/v3';
const axios = require('axios');

const loginValidation = [
    check('username')
      .exists()
      .withMessage('username empty'),
    check('password')
      .exists()
      .withMessage('PASSWORD_IS_EMPTY')
      .withMessage('PASSWORD_LENGTH_MUST_BE_MORE_THAN_8'),
  ];

// router.post('/login', loginValidation, async (req, res) => {
//     const { username, password } = req.body;
//     const data = {
//         auth: {
//             identity: {
//                 methods: ['password'],
//                 password: {
//                     user: {name: username, domain: {id: 'default'}, password}
//                 }
//             }
//         }
//     };
//     const url = `${endpoint}/auth/tokens`;
//     const response = await axios.post(url, data);
//     if (response.status === 201) {
//         const token = response.headers['x-subject-token']
//         const jwtToken = jwt.sign({ user: username }, 'do not need to know',         
//         {
//             expiresIn: 1000000,
//         });
//         const role = {role: { name: 'admin', level: 0 }};
//         const userToReturn = { username, ...{ jwtToken }, ...role };
//         console.log(userToReturn)
//         delete userToReturn.hashedPassword;
//         res.status(200).json(userToReturn);
//     }
// })
router.post('/login',
    passport.authenticate('keystone'),
    (req, res) => {
        const { user } = req;
        console.log(user);
        const jwtToken = jwt.sign({ user: user }, 'do not need to know',         
            {
              expiresIn: 1000000,
            });
        const role = {role: { name: 'admin', level: 0 }};
        const userToReturn = { ...user, ...{ jwtToken }, ...role };
        console.log(userToReturn)
        delete userToReturn.hashedPassword;
        res.status(200).json(userToReturn)
    }
);
// router.post('/login',
//     passport.authenticate('keystone', { failureRedirect: '/login' }), async (req, res) => {
//         const { user } = req;
//         const jwtToken = await jwt.sign({ user: user }, 'do not need to know',         
//             {
//               expiresIn: 1000000,
//             });
//         const role = {role: { name: 'admin', level: 0 }};
//         const userToReturn = { ...user, ...{ jwtToken }, ...role };
//         console.log(userToReturn)
//         delete userToReturn.hashedPassword;
//         res.status(200).json(userToReturn);
//     }
// );

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