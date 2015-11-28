var express = require('express');
var router = express.Router();
var User = require('../lib/User');
var Gift = require('../lib/Gift');
var _ = require('lodash');


function ensureAdmin(options){
    if (typeof options == 'string') {
        options = { redirectTo: options }
    }
    options = options || {};

    var url = options.redirectTo || '/login';
    var setReturnTo = (options.setReturnTo === undefined) ? true : options.setReturnTo;

    return function(req, res, next) {


        if (!req.isAuthenticated || !req.isAuthenticated() || !req.user.admin) {
            if (setReturnTo && req.session) {
                req.session.returnTo = req.originalUrl || req.url;
            }
            return res.redirect(url);
        }
        next();
    }
}


router.get('/registerations', ensureAdmin('/'), function(req, res){

    User.find({admin: false}, function(err, users){
        if (err){
            console.log(err);
            return next(err);
        }
        res.render('registerations', {registerations: users})
    });


});

router.get('/registerations/new', ensureAdmin('/'), function(req, res){
    res.render('new_registeration')
});

router.post('/registerations/new', ensureAdmin('/'), function(req, res){
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


router.get('/gifts', ensureAdmin('/'), function(req, res, next){
    Gift.find({}).populate('giver').exec(function(err, gifts){
    if (err){
        console.log(err);
        return next(err);
    }


        res.render('gifts', {gifts: gifts})
    });
});

router.post('/gifts', ensureAdmin('/'), function(req, res, next){
    var giftName = req.body.gift;

    var gift = new Gift({gift: giftName});

    gift.save(function(err){
        if (err) return next(err);

        res.redirect('/admin/gifts');
    })

});

module.exports = router;