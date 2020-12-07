const router = require('express').Router();
const axios = require('axios');
const passport = require('passport');

const endurl = 'http://20.194.32.137:32000/api/v1/';

router.all('/*', passport.authenticate('jwt', { session: false }));
/********** 
req.user object is only set when you use a passport authentication strategy that uses sessions. 
In this case, the authentication is stateless since you have specified {session: false}, which is how it should be for an api. Thus, the session does not have a user object. Here is how I set my req.user object in the passport.authenticate middleware:
Modify your jwtOptions to enable passing the req object to JwtStrategy function:
const jwtOptions = {  
    // Telling Passport to check authorization headers for JWT
    jwtFromRequest: ExtractJwt.fromAuthHeader(),
    // Telling Passport where to find the secret
    secretOrKey: config.secret,
    passReqToCallback: true, //<= Important, so that the verify function can accept the req param ie verify(req,payload,done)
  };
Modify the parameters to your JwtStrategy to include the request object as the first parameter; then within the if (user) block, just assign the returned user object to req.user:
const jwtLogin = new JwtStrategy(jwtOptions, function(req, payload, done) {
    User.findById(payload._id, function(err, user) {
      if (err) { return done(err, false); }

      if (user) {
        req.user = user; // <= Add this line
        done(null, user);
      } else {
        done(null, false);
      }
    });
  });
That is it: now any route that has the passport.authenticate("jwt", {session: false}) middleware will receive req.user upon successful authentication.

now every authenticated request has req.user 
**********************/

router.get('/archived-workflows', async (req, res) => {
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

router.get('/archived-workflows/:uid', async (req, res) => {
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

router.delete('/archived-workflows/:uid', async (req, res) => {
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

router.get('/cluster-workflow-templates', async (req, res) => {
    try {
        const response = await axios.get(endurl + 'cluster-workflow-templates', {
            headers: {
                Authorization: req.user.k8s_token
            }
        });
        res.send(response.data.items);
    }
    catch (err) {
        console.log(err)
        res.status(400).send(err);
    }
});

router.post('/cluster-workflow-templates', async (req, res) => {
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

router.post('/cluster-workflow-templates/lint', async (req, res) => {
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

router.get('/cluster-workflow-templates/:name', async (req, res) => {
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

router.put('/cluster-workflow-templates/:name', async (req, res) => {
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

router.delete('/cluster-workflow-templates/:name', async (req, res) => {
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

router.get('/cron-workflows/:namespace', async (req, res) => {
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

router.post('/cron-workflows/:namespace', async (req, res) => {
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

router.post('/cron-workflows/:namespace/lint', async (req, res) => {
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

router.get('/cron-workflows/:namespace/:name', async (req, res) => {
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

router.put('/cron-workflows/:namespace/:name', async (req, res) => {
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

router.delete('/cron-workflows/:namespace/:name', async (req, res) => {
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

router.put('/cron-workflows/:namespace/:name/resume', async (req, res) => {
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

router.put('/cron-workflows/:namespace/:name/suspend', async (req, res) => {
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

router.post('/events/:namespace/:discriminator', async (req, res) => {
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

router.get('/info', passport.authenticate('jwt', { session: false }), async (req, res) => {
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

router.get('/userinfo', async (req, res) => {
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

router.get('/version', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        const response = await axios.get(endurl + 'version', {
            headers: {
                Authorization: req.user.k8s_token
            }
        });
        res.send(response.data);
    }
    catch (err) {
        console.log(err);
        res.status(400).send(err);
    }
});

router.get('/stream/events/:namespace', async (req, res) => {
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

router.get('/workflow-events/:namespace', async (req, res) => {
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

router.get('/workflows/:namespace', async (req, res) => {
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

router.post('/workflows/:namespace', async (req, res) => {
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

router.post('/workflows/:namespace/lint', async (req, res) => {
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

router.post('/workflows/:namespace/submit', async (req, res) => {
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

router.get('/workflows/:namespace/:name', async (req, res) => {
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

router.delete('/workflows/:namespace/:name', async (req, res) => {
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

router.get('/workflows/:namespace/:name/log', async (req, res) => {
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

router.put('/workflows/:namespace/:name/resubmit', async (req, res) => {
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

router.put('/workflows/:namespace/:name/resume', async (req, res) => {
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

router.put('/workflows/:namespace/:name/retry', async (req, res) => {
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

router.put('/workflows/:namespace/:name/set', async (req, res) => {
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

router.put('/workflows/:namespace/:name/stop', async (req, res) => {
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

router.put('/workflows/:namespace/:name/suspend', async (req, res) => {
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

router.put('/workflows/:namespace/:name/terminate', async (req, res) => {
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

router.get('/workflows/:namespace/:name/:podname/log', async (req, res) => {
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

router.get('/workflow-templates/:namespace', async (req, res) => {
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

router.post('/workflow-templates/:namespace', async (req, res) => {
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

router.post('/workflow-templates/:namespace/lint', async (req, res) => {
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

router.get('/workflow-templates/:namespace/:name', async (req, res) => {
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

router.put('/workflow-templates/:namespace/:name', async (req, res) => {
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

router.delete('/workflow-templates/:namespace/:name', async (req, res) => {
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
        if (('tokenId' in req.user) && ('tokenId2' in req.user) && ('k8s_token' in req.user))
            next();
        else {
            console.error('authenticated but some tokens are missing');
            res.sendStatus(500);
        }
    }
    else res.sendStatus(401);
}

module.exports = router;
