const express = require('express');
const router = express.Router();
const request = require('request');

router.get('/', (req, res) => {
    if (req.isUnauthenticated())
        res.sendStatus(401);
    else if (!req.user.tokenId) {
        console.error('somethings wrong, tokenId doesn\'t exist');
        res.sendStatus(500);
    }
    else {
        request({
            url: 'http://183.111.177.141/identity/v3/auth/projects',
            headers: {
                'x-auth-token': req.user.tokenId
            }
        }, (err, response, body) => {
            if (err)
                console.error(err);
            console.log(body);
            res.send(body);
        });
    }
});

module.exports = router;