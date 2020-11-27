'use strict';
const debug = require('debug');
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const bodyParser = require('body-parser');
const axios = require('axios');
const session = require('express-session');
const SqlStore = require('express-mysql-session')(session);
const passport = require('passport');

const KeystoneStrategy = require('./passport-keystone');

const rootPath = path.join(__dirname, '../ClientApp/dist/ClientApp');

const sqlOptions = {
    host: 'localhost',
    port: 3306,
    user: 'alan',
    password: '1234',
    database: 'tempdb'
}

var app = express();

// uncomment after placing your favicon in /public
app.use(favicon('favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

const sessionStore = new SqlStore(sqlOptions);

app.use(session({
    key: 'argo_cookie',
    secret: 'do not need to know',
    store: sessionStore,
    resave: false,
    saveUninitialized: false
}));

passport.serializeUser((user, done) => done(null, user));

passport.deserializeUser((obj, done) => done(null, obj));

passport.use(new KeystoneStrategy({
    authUrl: 'http://183.111.177.141/identity/v3/auth/tokens'
}, async (req, done) => {
    req.user.tokenId = req.token.id;
    try {
        const projectres = await axios.get('http://183.111.177.141/identity/v3/auth/projects', {
            headers: {
                'x-auth-token': req.user.tokenId
            }
        });
        if (projectres.data.projects?.length < 1)
            throw new Error('project property error');
        const first_project_id = projectres.data.projects[0].id;
        const tokenres = await axios.post('http://183.111.177.141/identity/v3/auth/tokens',
            {
                auth: {
                    identity: {
                        methods: ['token'],
                        token: {
                            id: req.user.tokenId
                        }
                    },
                    scope: {
                        project: {
                            id: first_project_id
                        }
                    }
                }
            }, {
            headers: {
                'x-auth-token': req.user.tokenId
            }
        });
        req.user.tokenId2 = tokenres.headers['x-subject-token'];
        done(null, req.user);
    }
    catch (err) {
        console.error(err);
    }
}));

app.use(passport.initialize());
app.use(passport.session());

app.get(['/', '/summary/?', '/admin/?', '/workflows/?', '/workflow-templates/?',
    '/cluster-workflow-templates/?', '/login', '/login/*'],
    (req, res)=> res.sendFile(path.join(rootPath, 'index.html')));
// End of front-end routing
///////////////////////////
app.use(express.static(rootPath, { index: false }));

app.use('/account', require('./routes/account'));
app.use('/project', require('./routes/project'));
app.use('/user', require('./routes/user'));
app.use('/kube', require('./routes/kubectl'));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        console.error(err);
        res.status(err.status || 500);
        res.send(err.message);
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    console.error(err);
    res.status(err.status || 500);
    res.send('sorry');
});

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), ()=>
    debug('Express server listening on port ' + server.address().port));
