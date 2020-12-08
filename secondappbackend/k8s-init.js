const k8s = require('@kubernetes/client-node');
const tempdb_session = require('./connect-db');

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

const kc = new k8s.KubeConfig();
kc.loadFromOptions(require('./kube.config.json'));
kc.applyAuthorizationHeader();
const client = kc.makeApiClient(k8s.CoreV1Api);
/*module.exports = (async () => {
    try {
        const session = await tempdb_session.getSession();
        const result = await session.sql(`SELECT * FROM tempdb.cluster_infos WHERE name='admin'`).execute();
        data = result.fetchOne();
        const k8s_token = 'Bearer ' + data[5];
        client.defaultHeaders = {
            Authorization: k8s_token
        };
        return client;
    }
    catch (err) {
        console.error(err);
    }
});*/
/*client.defaultHeaders = {
    Authorization: 'Bearer ' + require('./ksinfo.json').K8S_TOKEN
};*/

module.exports = client;