const router = require('express').Router();
const axios = require('axios');

const KsInfo = require('../ksinfo.json');

const ksUserUrl = KsInfo.KS_AUTH_URL + '/v' + KsInfo.KS_IDENTITY_API_VERSION + '/users';

router.get('/', async (req, res) => {
    if (req.isUnauthenticated()) {
        res.sendStatus(401);
        return;
    }
    else if (!req.user.tokenId2) {
        res.status(401).send('second token needed');
        return;
    }
    try {
        const response = await axios.get(ksUserUrl, {
            headers: {
                'x-auth-token': req.user.tokenId2
            }
        });
        if (!('users' in response.data))
            throw new Error('users not exist in response');
        const usersData = response.data.users;
        if (usersData.length < 1) {
            res.sendStatus(204);
            return;
        }
        let users = usersData.filter(elem => elem.is_wf && ('default_project_id' in elem)
            && ('domain_id' in elem));
        if (users.length < 1) {
            res.sendStatus(204);
            return;
        }
        const users2 = users.map(elem => {
            return {
                id: elem.id,
                name: elem.name,
                description: elem.description,
                email: elem.email,
                primary_namespace_id: elem.default_project_id
            }
        });
        res.send(users2);
    }
    catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

router.get('/admin', (req, res) => {
    if (req.isUnauthenticated()) {
        res.sendStatus(401);
        return;
    }
    else if (!req.user.tokenId2) {
        res.status(401).send('second token needed');
        return;
    }
    else if (req.user.roles.includes('wf-app-admin'))
        res.send('admin ok');
    else
        res.status(401).send('not admin');
});

router.get('/:id', async (req, res) => {
    if (req.isUnauthenticated()) {
        res.sendStatus(401);
        return;
    }
    else if (!req.user.tokenId2) {
        res.status(401).send('second token needed');
        return;
    }
    try {
        const response = await axios.get(ksUserUrl + '/' + req.params.id, {
            headers: {
                'x-auth-token': req.user.tokenId2
            }
        });
        if (!response.data.user) {
            res.sendStatus(404);
            return;
        }
        const userData = response.data.user;
        res.send({
            id: userData.id,
            name: userData.name,
            description: userData.description,
            email: userData.email,
            primary_namespace_id: userData.default_project_id
        });
    }
    catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

router.post('/', async (req, res) => {
    if (req.isUnauthenticated()) {
        res.sendStatus(401);
        return;
    }
    else if (!req.user.tokenId2) {
        res.status(401).send('second token needed');
        return;
    }
    try {
        const response = await axios.post(ksUserUrl, req.body, {
            headers: {
                'x-auth-token': req.user.tokenId2
            }
        });
        res.sendStatus(response.status);
    }
    catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
});

router.get('/:id/namespace', async (req, res) => {
    if (req.isUnauthenticated()) {
        res.sendStatus(401);
        return;
    }
    else if (!req.user.tokenId2) {
        res.status(401).send('second token needed');
        return;
    }
    try {
        const response = axios.get(ksUserUrl + '/' + req.params.id + '/namespaces', {
            headers: {
                'x-auth-token': req.user.tokenId2
            }
        });
        res.send(response.data);
    }
    catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
});

router.patch('/:id', async (req, res) => {
    if (req.isUnauthenticated()) {
        res.sendStatus(401);
        return;
    }
    else if (!req.user.tokenId2) {
        res.status(401).send('second token needed');
        return;
    }
    try {
        const response = await axios.patch(ksUserUrl + '/' + req.params.id, {
            headers: {
                'x-auth-token': req.user.tokenId2
            }
        });
        res.send('user info updated');
    }
    catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
});

module.exports = router;