const express = require('express');
const passport = require('passport');
require('../config/passport')(passport);
const { ensureAuthenticated } = require('../middleware/auth');
const app=express();
const router = express.Router();







router.get('/', (req, res, next) => {
    res.render('login',{title:"Login Page"});
});



router.get('/google',passport.authenticate('google',{scope:['email','profile']}));




router.get('/google/callback',
    passport.authenticate('google', {successRedirect:'/', failureRedirect: '/auth'}));


router.get('/logout',  (req, res, next) => {
    req.logout(function(err) {
        if (err) { return next(err); }
        // res.redirect('/');
      });
    res.redirect('/auth');
});

module.exports = router;