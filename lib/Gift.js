/**
 * Created by Zharktas on 28.11.2015.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Gift = new Schema({
    gift: String,
    giver: { type: Schema.Types.ObjectId, ref: 'User'}
    });


module.exports = mongoose.model('Gift', Gift);