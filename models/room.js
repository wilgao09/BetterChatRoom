

var mongoose = require('mongoose');
var db = require('../conf/database');

var contentSchema = new mongoose.Schema({
    typ:String,
    data:String
})

var msgSchema = new mongoose.Schema({
    time:Number,
    usrn:String,
    rci:String,
    contents: contentSchema
})

module.exports = mongoose.model("room", new mongoose.Schema({
    room:String,
    chunk:Number,
    msgs:[msgSchema]
}));