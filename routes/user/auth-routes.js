const router = require('express').Router();
const passport = require('passport');
//const passport = require('../config/passport-setup');

var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.set('views', __dirname+'../views');
app.set('view engine' , 'ejs');
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(express.static('/views'));

// auth login
router.get('/login', (req, res) => {
	if(req.user){
		res.redirect('/profile');
	}
    res.render('login', { user: req.user });
});

// auth logout
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/'); 
});

// auth with google+
router.get('/google', passport.authenticate('google', {
    scope: ['profile']
}));

// callback route for google to redirect to
// hand control to passport to use code to grab profile info
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    // res.send(req.user);
    res.redirect('/profile');
});

router.post('/local',urlencodedParser,
  passport.authenticate('local', { successRedirect: '/profile',
                                   failureRedirect: '/auth/login'
                                 })
);

module.exports = router;