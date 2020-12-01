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

router.delete('/archived-workflows/:uid', ensureAuthenticated, async (req, res) => {
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

router.get('/cluster-workflow-templates/:name', ensureAuthenticated, async (req, res) => {
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

router.put('/cluster-workflow-templates/:name', ensureAuthenticated, async (req, res) => {
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

router.delete('/cluster-workflow-templates/:name', ensureAuthenticated, async (req, res) => {
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

router.get('/cron-workflows/:namespace', ensureAuthenticated, async (req, res) => {
    try {
        const response = await axios.get(endurl + 'cron-workflows/' + req.params.namespace, {
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

router.post('/cron-workflows/:namespace', ensureAuthenticated, async (req, res) => {
    try {
        const response = await axios.post(endurl + 'cron-workflows/' + req.params.namespace, req.body, {
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

router.post('/cron-workflows/:namespace/lint', ensureAuthenticated, async (req, res) => {
    try {
        const response = await axios.post(endurl + 'cron-workflows/' + req.params.namespace + '/lint', req.body, {
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

router.get('/cron-workflows/:namespace/:name', ensureAuthenticated, async (req, res) => {
    try {
        const response = await axios.get(endurl + 'cron-workflows/' + req.params.namespace + '/' +
            req.params.name, {
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

router.put('/cron-workflows/:namespace/:name', ensureAuthenticated, async (req, res) => {
    try {
        const response = await axios.put(endurl + 'cron-workflows/' + req.params.namespace + '/' +
            req.params.name, req.body, {
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

router.delete('/cron-workflows/:namespace/:name', ensureAuthenticated, async (req, res) => {
    try {
        const response = await axios.delete(endurl + 'cron-workflows/' + req.params.namespace + '/' +
            req.params.name, {
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

router.put('/cron-workflows/:namespace/:name/resume', ensureAuthenticated, async (req, res) => {
    try {
        const response = await axios.put(endurl + 'cron-workflows/' + req.params.namespace + '/' +
            req.params.name + '/resume', req.body, {
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

router.put('/cron-workflows/:namespace/:name/suspend', ensureAuthenticated, async (req, res) => {
    try {
        const response = await axios.put(endurl + 'cron-workflows/' + req.params.namespace + '/' +
            req.params.name + '/suspend', req.body, {
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

router.post('/events/:namespace/:discriminator', ensureAuthenticated, async (req, res) => {
    try {
        const response = await axios.post(endurl + 'events/' + req.params.namespace + '/'
            + req.params.discriminator, req.body, {
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

router.get('/info', ensureAuthenticated, async (req, res) => {
    try {
        const response = await axios.get(endurl + 'info', {
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

router.get('/userinfo', ensureAuthenticated, async (req, res) => {
    try {
        const response = await axios.get(endurl + 'userinfo', {
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

router.get('/version', ensureAuthenticated, async (req, res) => {
    try {
        const response = await axios.get(endurl + 'version', {
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

router.get('/stream/events/:namespace', ensureAuthenticated, async (req, res) => {
    try {
        const response = await axios.get(endurl + 'stream/events/' + req.params.namespace, {
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

router.get('/workflow-events/:namespace', ensureAuthenticated, async (req, res) => {
    try {
        const response = await axios.get(endurl + 'workflow-events/' + req.params.namespace, {
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

router.get('/workflows/:namespace', ensureAuthenticated, async (req, res) => {
    try {
        const response = await axios.get(endurl + 'workflows/' + req.params.namespace, {
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

router.post('/workflows/:namespace', ensureAuthenticated, async (req, res) => {
    try {
        const response = await axios.get(endurl + 'workflows/' + req.params.namespace, req.body, {
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

router.post('/workflows/:namespace/lint', ensureAuthenticated, async (req, res) => {
    try {
        const response = await axios.get(endurl + 'workflows/' + req.params.namespace +'/lint',
            req.body, {
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

router.post('/workflows/:namespace/submit', ensureAuthenticated, async (req, res) => {
    try {
        const response = await axios.get(endurl + 'workflows/' + req.params.namespace + '/submit',
            req.body, {
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

router.get('/workflows/:namespace/:name', ensureAuthenticated, async (req, res) => {
    try {
        const response = await axios.get(endurl + 'workflows/'
            + req.params.namespace + '/' + req.params.name, {
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

router.delete('/workflows/:namespace/:name', ensureAuthenticated, async (req, res) => {
    try {
        const response = await axios.delete(endurl + 'workflows/'
            + req.params.namespace + '/' + req.params.name, {
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

router.get('/workflows/:namespace/:name/log', ensureAuthenticated, async (req, res) => {
    try {
        const response = await axios.get(endurl + 'workflows/'
            + req.params.namespace + '/' + req.params.name + '/log', {
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

router.put('/workflows/:namespace/:name/resubmit', ensureAuthenticated, async (req, res) => {
    try {
        const response = await axios.put(endurl + 'workflows' + req.params.namespace + '/'
            + req.params.name + '/resubmit', req.body, {
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

router.put('/workflows/:namespace/:name/resume', ensureAuthenticated, async (req, res) => {
    try {
        const response = await axios.put(endurl + 'workflows' + req.params.namespace + '/'
            + req.params.name + '/resume', req.body, {
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

router.put('/workflows/:namespace/:name/retry', ensureAuthenticated, async (req, res) => {
    try {
        const response = await axios.put(endurl + 'workflows' + req.params.namespace + '/'
            + req.params.name + '/retry', req.body, {
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

router.put('/workflows/:namespace/:name/set', ensureAuthenticated, async (req, res) => {
    try {
        const response = await axios.put(endurl + 'workflows' + req.params.namespace + '/'
            + req.params.name + '/set', req.body, {
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

router.put('/workflows/:namespace/:name/stop', ensureAuthenticated, async (req, res) => {
    try {
        const response = await axios.put(endurl + 'workflows' + req.params.namespace + '/'
            + req.params.name + '/stop', req.body, {
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

router.put('/workflows/:namespace/:name/suspend', ensureAuthenticated, async (req, res) => {
    try {
        const response = await axios.put(endurl + 'workflows' + req.params.namespace + '/'
            + req.params.name + '/suspend', req.body, {
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

router.put('/workflows/:namespace/:name/terminate', ensureAuthenticated, async (req, res) => {
    try {
        const response = await axios.put(endurl + 'workflows' + req.params.namespace + '/'
            + req.params.name + '/terminate', req.body, {
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

router.get('/workflows/:namespace/:name/:podname/log', ensureAuthenticated, async (req, res) => {
    try {
        const response = await axios.get(endurl + 'workflows/'
            + req.params.namespace + '/' + req.params.name + '/' + req.params.podname + '/log', {
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

router.get('/workflow-templates/:namespace', ensureAuthenticated, async (req, res) => {
    try {
        const response = await axios.get(endurl + 'workflows-templates/' + req.params.namespace, {
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

router.post('/workflow-templates/:namespace', ensureAuthenticated, async (req, res) => {
    try {
        const response = await axios.post(endurl + 'workflows-templates/' + req.params.namespace,
            req.body, {
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

router.post('/workflow-templates/:namespace/lint', ensureAuthenticated, async (req, res) => {
    try {
        const response = await axios.post(endurl + 'workflows-templates/'
            + req.params.namespace + '/lint', req.body, {
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

router.get('/workflow-templates/:namespace/:name', ensureAuthenticated, async (req, res) => {
    try {
        const response = await axios.get(endurl + 'workflows-templates/'
            + req.params.namespace + '/' + req.params.name, {
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

router.put('/workflow-templates/:namespace/:name', ensureAuthenticated, async (req, res) => {
    try {
        const response = await axios.put(endurl + 'workflows-templates/'
            + req.params.namespace + '/'+req.params.name, req.body, {
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

router.delete('/workflow-templates/:namespace/:name', ensureAuthenticated, async (req, res) => {
    try {
        const response = await axios.delete(endurl + 'workflows-templates/'
            + req.params.namespace + '/' + req.params.name, {
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