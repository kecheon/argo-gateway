const router = require('express').Router();
const axios = require('axios');
const passport = require('passport');
//const spawn = require('child_process');

const KsInfo = require('../ksinfo.json');

const KsUrl = KsInfo.KS_AUTH_URL + 'v' + KsInfo.KS_IDENTITY_API_VERSION + '/';

const k8sClient = require('../k8s-init');

// router.all('*', ensureAuthenticated);

router.all('/*', passport.authenticate('jwt', { session: false }));

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
        let response = null;
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
        projects = response.data.projects.filter(elem => elem.is_wf && !elem.is_cluster);
        projects.forEach(elem => {
            delete elem.is_wf;
            delete elem.is_cluster;
            delete elem.tags;
            delete elem.options;
            delete elem.links;
        });
        console.log(projects);
        res.json({namespaces: projects});
    }
    catch (err) {
        console.log(err);
        res.status(400).send(err);
    }
});

router.get('/:id', async (req, res) => {
    if (!(req.user.roles?.includes('wf-app-admin')) && !(req.user.roles?.includes('wf-tenant-admin'))) {
        res.sendStatus(401);
        return;
    }
    const tokenId = req.user.roles?.includes('wf-tenant-admin') ? req.user.admin_token : req.user.tokenId2;
    try {
        const response = await axios.get(KsUrl + 'projects/' + req.params.id, {
            headers: {
                'x-auth-token': tokenId
            }
        });
        let project = response.data.project;
        if (!(project?.is_wf)) {
            res.status(400).send('requested cluster is not properly set.(is_wf)');
            return;
        }
        delete project.tags, delete project.options, delete project.links;
        if (project.is_cluster)
            res.sendStatus(404);
        else {
            delete project.tags, delete project.options, delete project.links;
            delete project.is_wf, delete project.is_cluster;
            res.send(project);
        }
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
    /*if (!('parent_id' in req.body)) {
        res.status(400).send('parent_id is missing.');
        return;
    }*/
    let project = req.body;
    project.is_wf = true;
    project.is_cluster = false;
    try {
        const tokenId = req.user.roles?.includes('wf-tenant-admin') ? req.user.admin_token : req.user.tokenId2;
        /*const clResponse = await axios.get(KsUrl + 'projects/' + project.parent_id, {
            headers: {
                'x-auth-token': tokenId
            }
        });
        const parent = clResponse.data.project;
        if (!parent.is_wf || !parent.is_cluster) {
            res.status(400).send('invalid parent id');
            return;
        }*/
        const ksResponse = await axios.post(KsUrl + 'projects', project, {
            headers: {
                'x-auth-token': tokenId
            }
        });
        const k8sRes = await k8sClient.createNamespace(req.body);

        res.send(ksResponse.data);
    }
    catch (err) {
        res.status(400).send(err);
    }
});

router.delete('/:id', async (req, res) => {
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
        const project = response.data.project;
        if (!project.is_wf || project.is_cluster) {
            res.status(400).send('required id is not a valid namespace id');
            return;
        }
        const projectName = project.name;
        const ksResponse = await axios.delete(KsUrl + 'projects/' + req.params.id, {
            headers: {
                'x-auth-token': tokenId
            }
        });
        const k8sResponse = await k8sClient.deleteNamespace(projectName);
        res.send('namespace deleted');
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