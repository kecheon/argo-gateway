const axios = require('axios');
const endpoint = 'http://183.111.177.141/identity/v3';

const Strategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

const applyPassportStrategy = passport => {
  const options = {};
  options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  options.secretOrKey = 'do not need to know';
  options.passReqToCallback = true;
  passport.use(
    new Strategy(options, async (req, payload, done) => {
      const username = payload.username;
      const password = payload.password;
    
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
      const response = await axios.post(url, data);
      if (response.status === 201) {
        return done(null, {
            username: payload.username,
            prjToken
        });
      }
      console.log('no token issued');
      return done(null, false);
    })
  );
};

module.exports = applyPassportStrategy;