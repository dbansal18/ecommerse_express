const router = require('express').Router();
var express = require('express');
var app=express();

const authCheck = (req, res, next) => {
    if(!req.user){
        res.redirect('/auth/login');
    } else {
        next();
    }
};
app.use( express.static( "views" ) );
router.get('/', authCheck, (req, res) => {
	//console.log(req.user.thumbnail);
    res.render('profile', { user: req.user });
});

module.exports = router;