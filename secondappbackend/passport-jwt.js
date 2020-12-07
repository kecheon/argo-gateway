require('dotenv').config();
const blacklist = require('express-jwt-blacklist');
const axios = require('axios');
const endpoint = 'http://183.111.177.141/identity/v3';

const Strategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

// const k8s_token = process.env.K8S_TOKEN;
const secret = process.env.SECRET;

const applyPassportStrategy = passport => {
  const options = {};
  options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  options.secretOrKey = secret;
  options.isRevoked = blacklist.isRevoked;
  options.passReqToCallback = true;
  passport.use(
    new Strategy(options, async (req, payload, done) => {
      const name = payload.user.name;
      const password = payload.user.password;
    
      const data = {
        auth: {
            identity: {
                methods: ['password'],
                password: {
                    user: {name, domain: {id: 'default'}, password}
                }
            }
        }
      };
      const url = `${endpoint}/auth/tokens`;
      try {
        const response = await axios.post(url, data);
        if (response.status === 201) {
          console.log(response.data.token.user);
          const token = response.headers['x-subject-token']
          // 2. get project list with unscoped access token
          const projectListEndPoint = `${endpoint}/auth/projects`;
          const headers = {
              headers: { 
                  'X-Auth-Token': token
              }
          }
          const prjListResponse = await axios.get(projectListEndPoint, headers);
          const { projects }= prjListResponse.data;
          const prjScopedTokenEndPoint = `${endpoint}/auth/tokens`;
          const authData = {
              'auth': {
                  'identity': {
                      'methods': ['token'],
                      'token': { 'id': token }
                  },
                  'scope': {
                      'project': {
                          'id': projects[0].id
                      }
                  }
              }
          }
          const authHeaders = { 
            'X-Auth-Token': token,
            'Content-Type': 'application/json'
          }
          const prjTokenResponse = await axios.post(prjScopedTokenEndPoint, authData, {headers: authHeaders});
          const prjToken = prjTokenResponse.headers['x-subject-token'];

          return done(null, {
              user: response.data.token.user,
              k8s_token: `Bearer ${prjToken}`
          });
        }
        console.log('no token issued');
        return done(null, false);
      } catch(err) {
        console.log(err);
        return done(null, false);
      }
    })
  );
};

module.exports = applyPassportStrategy;
