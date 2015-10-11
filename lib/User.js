/**
 * Created by Zharktas on 30.8.2015.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var User = new Schema({
    admin: Boolean,
    persons: [{
        name: String,
        attending: Boolean,
        allergies: String
    }],
    additionalInfo: String
});

User.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', User);
