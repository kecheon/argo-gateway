const router = require('express').Router();
const axios = require('axios');

const endurl = 'http://20.194.32.137:32000/api/v1/';

router.get('/archived-workflows', ensureAuthenticated, async (req, res) => {
    try {
        const response = await axios.get(endurl + 'archived-workflows', {
            headers: {
                Authorization: req.user.k8s_token
            }
        });
        res.send(response.data.items);
    }
    catch (err) {
        res.status(400).send(err);
    }
});

router.get('/archived-workflows/:uid', ensureAuthenticated, async (req, res) => {
    try {
        const response = await axios.get(endurl + 'archived-workflows/' + req.params.uid, {
            headers: {
                Authorization: req.user.k8s_token
            }
        });
        res.send(response.data);
    }
    catch (err) {
        res.status(400).send(err);
    }
});

router.delete('/archived-workflows/:uid', ensureAuthenticated, async (res, res) => {
    try {
        const response = await axios.delete(endurl + 'archived-workflows/' + req.params.uid, {
            headers: {
                Authorization: req.user.k8s_token
            }
        });
        res.send(response.data);
    }
    catch (err) {
        res.status(400).send(err);
    }
});

router.get('/cluster-workflow-templates', ensureAuthenticated, async (req, res) => {
    try {
        const response = await axios.get(endurl + 'cluster-workflow-templates', {
            headers: {
                Authorization: req.user.k8s_token
            }
        });
        res.send(response.data.items);
    }
    catch (err) {
        res.status(400).send(err);
    }
});

router.post('/cluster-workflow-templates', ensureAuthenticated, async (req, res) => {
    try {
        const response = await axios.post(endurl + 'cluster-workflow-templates', req.body, {
            headers: {
                Authorization: req.user.k8s_token
            }
        });
        res.send(response.data);
    }
    catch (err) {
        res.status(400).send(err);
    }
});

router.post('/cluster-workflow-templates/lint', ensureAuthenticated, async (req, res) => {
    try {
        const response = await axios.post(endurl + 'cluster-workflow-templates/lint', req.body, {
            headers: {
                Authorization: req.user.k8s_token
            }
        });
        res.send(response.data);
    }
    catch (err) {
        res.status(400).send(err);
    }
});

router.get('/cluster-workflow-templates/:name', ensureAuthenticated, (req, res) => {
    try {
        const response = await axios.get(endurl + 'cluster-workflow-templates/' + req.params.name, {
            headers: {
                Authorization: req.user.k8s_token
            }
        });
        res.send(response.data);
    }
    catch (err) {
        res.status(400).send(err);
    }
});

router.put('/cluster-workflow-templates/:name', ensureAuthenticated, (req, res) => {
    try {
        const response = await axios.put(endurl + 'cluster-workflow-templates/' + req.params.name, req.body, {
            headers: {
                Authorization: req.user.k8s_token
            }
        });
        res.send(response.data);
    }
    catch (err) {
        res.status(400).send(err);
    }
});

router.delete('/cluster-workflow-templates/:name', ensureAuthenticated, (req, res) => {
    try {
        const response = await axios.delete(endurl + 'cluster-workflow-templates/' + req.params.name, {
            headers: {
                Authorization: req.user.k8s_token
            }
        });
        res.send(response.data);
    }
    catch (err) {
        res.status(400).send(err);
    }
});


function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        if ((tokenId in req.user) && (tokenId2 in req.user) && (k8s_token in req.user))
            next();
        else {
            console.error('authenticated but some tokens are missing');
            res.sendStatus(500);
        }
    }
    else res.sendStatus(401);
}

module.exports = router;