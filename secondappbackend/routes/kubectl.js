const router = require('express').Router();
const spawn = require('child_process');

router.get('/sa/:account/:namespace', (req, res) => {
    const args = ['get', 'serviceaccount',
        req.params.account, '-n', req.params.namespace,
        '-o', 'json'];
    const kbctl = spawn('kubectl', args);
    kbctl.on('data', (data) => {

    })
})

module.exports = router;