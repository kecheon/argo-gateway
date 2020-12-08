const router = require('express').Router();
const axios = require('axios');
//const spawn = require('child_process');

const KsInfo = require('../ksinfo.json');

const KsUrl = KsInfo.KS_AUTH_URL + '/v' + KsInfo.KS_IDENTITY_API_VERSION + '/';

router.all('/*', ensureAuthenticated);

/*router.get('/sa/:account/:namespace', (req, res) => {
    const args = ['get', 'serviceaccount',
        req.params.account, '-n', req.params.namespace,
        '-o', 'json'];
    const kbctl = spawn('kubectl', args);
    kbctl.on('data', (data) => {

    })
})*/

router.get('/', async (req, res) => {
    try {
        const response = null;
        if (req.user.roles.includes('wf-app-admin')) {
            // send all project for wf-app-admin
            response = await axios.get(KsUrl + 'projects', {
                headers: {
                    'x-auth-token': req.user.tokenId2
                }
            });
        }
        else {
            response = await axios.get(KsUrl + 'users/' + req.user.id + '/projects', {
                headers: {
                    'x-auth-token': req.user.tokenId2
                }
            });
        }
        projects = response.data.projects.filter(elem => elem.is_wf);
        res.send(projects);
    }
    catch (err) {
        res.status(400).send(err);
    }
});

router.get('/:id', async (req, res) => {
    if (!(req.user.roles?.includes('wf-app-admin')) && !(req.user.roles?.includes('wf-tenant-admin'))) {
        res.sendStatus(401);
        return;
    }
    try {
        const tokenId = req.user.roles?.includes('wf-tenant-admin') ? req.user.admin_token : req.user.tokenId2;
        const response = await axios.get(KsUrl + 'projects/' + req.params.id, {
            headers: {
                'x-auth-token': tokenId
            }
        });
        let project = response.data.project;
        delete project.tags, delete project.options, delete project.links;
        res.send(project);
    }
    catch (err) {
        res.status(400).send(err);
    }
});

router.get('/switch/:name', async (req, res) => {
    try {
        const response = await axios.post(KsUrl + 'auth/tokens', {
            auth: {
                identity: {
                    methods: ['token'],
                    token: { id: req.user.tokenId2 }
                },
                scope: {
                    project: {
                        domain: { id: 'default' },
                        name: req.params.name
                    }
                }
            }
        });
        const data = response.data.token;
        req.user.default_project_id = data.project.id;
        req.user.default_project_name = data.project.name;
        req.user.roles = data.roles.map(elem => elem.name).filter(elem => /^wf\-/.test(elem));
        res.send({
            id: data.project.id,
            name: data.project.name,
            roles: req.user.roles
        });
    }
    catch (err) {
        res.status(500).send(err);
    }
});

router.post('/', async (req, res) => {
    if (!(req.user.roles?.includes('wf-app-admin')) && !(req.user.roles?.includes('wf-tenant-admin'))) {
        res.sendStatus(401);
        return;
    }
    try {
        const tokenId = req.user.roles?.includes('wf-tenant-admin') ? req.user.admin_token : req.user.tokenId2;
        const response = await axios.post(KsUrl + 'projects/' + req.params.id,req.body, {
            headers: {
                'x-auth-token': tokenId
            }
        });
        res.send(response.data);
    }
    catch (err) {
        res.status(400).send(err);
    }
})


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