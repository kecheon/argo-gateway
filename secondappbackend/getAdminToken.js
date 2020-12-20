const axios = require('axios');

const KsInfo = require('./ksinfo.json');
const KsIdentityURL = KsInfo.KS_AUTH_URL + 'v' + KsInfo.KS_IDENTITY_API_VERSION + '/';

async function getAdminToken() {
  try {
        const data = JSON.stringify({"auth":{"identity":{"methods":["password"],"password":{"user":{"name":"admin","domain":{"id":"default"},"password":"devstack"}}}}});

        const config = {
            method: 'post',
            url: `${KsIdentityURL}/auth/tokens`,
            headers: { 
                'Content-Type': 'application/json'
            },
            data : data
        };

        const response1 = await axios(config);
     
      //////////////////////////
      const adminInfo = await axios.get(KsIdentityURL + 'users/' + response1.data.token.user.id, {
          headers: {
              'x-auth-token': response1.headers['x-subject-token'],
              'Content-Type': 'application/json'
          }
      });
      let default_project_id = '';
      if ('default_project_id' in adminInfo)
          default_project_id = adminInfo.default_project_id;
      else {
          const projectres = await axios.get(KsIdentityURL + 'auth/projects', {
              headers: {
                  'x-auth-token': response1.headers['x-subject-token']
              }
          });
          if (projectres.data.projects?.length < 1)
              throw new Error('no project id');
          else
              default_project_id = projectres.data.projects[0].id;
      }
      const tokenres = await axios.post(KsIdentityURL + 'auth/tokens',
          {
              auth: {
                  identity: {
                      methods: ['token'],
                      token: {
                          id: response1.headers['x-subject-token']
                      }
                  },
                  scope: {
                      project: {
                          id: default_project_id
                      }
                  }
              }
          }, {
          headers: {
                  'x-auth-token': response1.headers['x-subject-token']
          }
      });
      return tokenres.headers['x-subject-token'];
  }
  catch (err) {
      console.error(err);
  }
}

module.exports = getAdminToken;