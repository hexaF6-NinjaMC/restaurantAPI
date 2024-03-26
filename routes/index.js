const passport = require('passport');

const router = require('express').Router();

//router.use('/', require('./swagger')); swagger not yet implemented

router.use('/admin', require('./admin'));
router.use('/user', require('./users'));
router.use('/order', require('./orders'));
router.use('/inventory', require('./inv'));

// LOGIN - LOGOUT may not be correct?

router.get('/login', passport.authenticate('google'), (req, res) => {
    // code here?
});

router.get('/logout', function(req, res, next) {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
    })
});


module.exports = router;