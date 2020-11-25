const router = require('express').Router();
const request = require('request');

router.get('/', (req, res) => {
    if (req.isUnauthenticated()) {
        res.sendStatus(401);
        return;
    }
    request({
        url: 'http://183.111.177.141/identity/v3/users',
        headers: {
            'x-auth-token':req.user.tokenId2
        }
    }, (err, response, body) => {
            if (err) console.error(err);
            console.log(response);
            console.log(body);
            res.send('got list');
    })
})

module.exports = router;