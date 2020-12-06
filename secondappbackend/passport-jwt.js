require('dotenv').config();

const axios = require('axios');
const endpoint = 'http://183.111.177.141/identity/v3';

const Strategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

const k8s_token = process.env.K8S_TOKEN;

const applyPassportStrategy = passport => {
  const options = {};
  options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  options.secretOrKey = 'do not need to know';
  options.passReqToCallback = true;
  passport.use(
    new Strategy(options, async (req, payload, done) => {
      const username = payload.user.name;
      const password = payload.user.password;
    
      const data = {
        auth: {
            identity: {
                methods: ['password'],
                password: {
                    user: {name: username, domain: {id: 'default'}, password}
                }
            }
        }
      };
      const url = `${endpoint}/auth/tokens`;
      try {
        const response = await axios.post(url, data);
        if (response.status === 201) {
          console.log(response.data.token.user);
          return done(null, {
              user: response.data.token.user,
              k8s_token
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