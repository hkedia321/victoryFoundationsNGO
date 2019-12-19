const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const port = 9000;
const fetch = require('node-fetch');
const Bluebird = require('bluebird');

fetch.Promise = Bluebird;


const app = express();
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
);

passport.use(
    new GoogleStrategy(
        {
            clientID: keys.googleClientID,
            clientSecret: keys.googleClientSecret,
            callbackURL: '/auth/google/callback',
            userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
            proxy: true
        },
        (accessToken, refreshToken, profile, done) => {
            const user = {
                googleId: profile.id,
                displayName: profile.displayName,
                name: profile.name,
                emails: profile.emails,
                photos: profile.photos
            };
            done(null, user);
        }
    )
);

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});


app.use(helmet());

app.use(bodyParser.json());

app.use(cors());

app.use(morgan('combined'));

app.use('/victory', express.static('build', {
    setHeaders: setCustomCacheControl
}));

app.engine('html', require('ejs').renderFile);

app.get('/', (req, res) => {
    if(req.user) {
        fetch('https://ohack.herokuapp.com/v1/victoryfoundation/users/logon?username='+req.user.emails[0].value)
            .then(r => {
                if (r.ok) {
                    res.render(__dirname + '/index.html');
                } else {
                        res.render(path.resolve('__dirname', '../build/error.html'));
                }
            });
    } else {
        res.redirect('/auth/google');
    }
});

app.get('/api/current_user', (req, res) => {
    res.send(req.user);
});

app.get('/auth/google/callback', passport.authenticate('google'),(err, req, res, next) => {
        console.log('req',err);
    } ,
    (req, res) => {
        res.redirect('/');
    });

app.get('/auth/google',
    passport.authenticate('google', {
        scope: ['profile', 'email']
    })
);


app.listen(process.env.PORT || port, function (err) {
  if (err) {
    console.error(err.message);
  } else {
    console.log('Listening on http://localhost:%d', port);
  }
});

function setCustomCacheControl (res, path) {
    res.setHeader('Content-Type', express.static.mime.lookup(path));
}
