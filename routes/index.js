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
  res.render('user', {username: req.user.username, persons: req.user.persons, id: req.user.id, additionalInfo: req.user.additionalInfo});
});

router.post('/user/:id', ensureLoggedIn('/'), function(req, res){
  console.log(req.user);

  var amount = req.body.amount;
  console.log(amount);

  var persons = [];

  for ( var i = 0; i < amount; i++){
    var nameVar = "name-" + i;
    var attendingVar = "attending-" + i;
    var allergiesVar = "allergies-" + i;

    var person = {
      name: req.body[nameVar],
      attending: req.body[attendingVar],
      allergies: req.body[allergiesVar]
    };

    persons.push(person);
  }

  var additionalInfo = req.body.additionalInfo;

  console.log(req.user.id);
  User.findById(req.user.id, function(err,user){
    if (err){
      console.log("error while finding document:", err)
      return next(err);
    }
    console.log(user);
    user.persons = persons;
    user.additionalInfo = additionalInfo;
    user.save();

    console.log(user);
  });

  res.render('user', {username: req.user.username, persons: req.user.persons, id: req.user.id, additionalInfo: additionalInfo});
});

router.get('/arrival', ensureLoggedIn('/'), function(req, res){
  res.render('arrival', {id: req.user.id});
});

router.get('/venue', ensureLoggedIn('/'), function(req, res){
  res.render('venue', {id: req.user.id});
});

router.get('/program', ensureLoggedIn('/'), function(req, res){
  res.render('program', {id: req.user.id});
});

router.get('/wishlist', ensureLoggedIn('/'), function(req, res){
  res.render('wishlist', {id: req.user.id});
});


module.exports = router;
