const router = require('express').Router();
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
            res.send(body);
        });
    }
});

router.get('/:id', (req, res) => {
    if (req.isUnauthenticated()) {
        res.sendStatus(401);
        return;
    }
    request.post({
        url: 'http://183.111.177.141/identity/v3/auth/tokens',
        headers: {
            'x-auth-token': req.user.tokenId
        }
    }, {
        auth: {
            identity: {
                methods: ['token'],
                token: {
                    id: req.user.tokenId
                }
            },
            scope: {
                project: {
                    id: req.params.id
                }
            }
        }
    }, (err, response, body) => {
        if (err)
            console.error(err);
        res.send(body);
    })
});

module.exports = router;