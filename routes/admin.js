var express = require('express');
var router = express.Router();
var passport = require('passport');
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;
var User = require('../lib/User');
var _ = require('lodash');

router.get('/registerations', ensureLoggedIn('/'), function(req, res){

    User.find({admin: false}, function(err, users){
        if (err){
            console.log(err);
            return next(err);
        }
        res.render('registerations', {registerations: users})
    });


});

router.get('/registerations/new', ensureLoggedIn('/'), function(req, res){
    res.render('new_registeration')
});

router.post('/registerations/new', ensureLoggedIn('/'), function(req, res){
    var username = req.body.username;
    var password = req.body.password;
    var names = req.body.names;

    var persons = _.map(names, function(name){
        return {
            name: name,
            attending: false,
            allergies: ""
        }
    });

    User.register(new User({username: username, persons: persons, admin: false}), password, function(err){
        if (err) {
            console.log("Error during registeration", err);
            return next(err);
        }
        console.log("Created user");
        res.redirect('/admin/registerations');
    })
});
module.exports = router;