const router = require('express').Router();
const axios = require('axios');

router.get('/', async (req, res) => {
    if (req.isUnauthenticated())
        res.sendStatus(401);
    else if (!req.user.tokenId) {
        console.error('somethings wrong, tokenId doesn\'t exist');
        res.sendStatus(500);
    }
    else {
        try {
            const response = await axios.get('http://183.111.177.141/identity/v3/auth/projects', {
                headers: {
                    'x-auth-token': req.user.tokenId
                }
            });
            res.send(response.data);
        }
        catch (err) {
            console.error(err);
            res.sendStatus(500);
        }
    }
});

router.get('/:id', (req, res) => {
    if (req.isUnauthenticated()) {
        res.sendStatus(401);
        return;
    }
    try {
        const response = axios.post('http://183.111.177.141/identity/v3/auth/tokens',
            {
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
            },
            {
                headers: {
                    'x-auth-token': req.user.tokenId
                }
            })
        res.send(response.data);
    }
    catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

module.exports = router;