var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../lib/User');
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

if (process.env.registerationEnabled == 'true' ) {

  router.get('/register', function (req, res) {
    res.render('register')
  });

  router.post('/register', function (req, res, next) {
    console.log("Registering user");
    User.register(new User({username: req.body.username, admin: true}), req.body.password, function (err) {
      if (err) {
        console.log("Error during registeration", err);
        return next(err);
      }

      console.log("Created user");
      res.redirect('/');
    })
  });
}

router.post('/login', passport.authenticate('local'), function(req, res){
  if (req.user.admin == true){
    res.redirect('/admin/registerations')
  }
  else {
    res.redirect('/user/' + req.user._id)
  }
});

router.get('/user/:id', ensureLoggedIn('/'), function(req, res){
  res.render('user', {username: req.user.username, names: req.user.names});
});


module.exports = router;
