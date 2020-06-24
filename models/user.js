
var mongoose = require("mongoose");
var db = require('../conf/database');

module.exports = mongoose.model("user",new mongoose.Schema({ 
    usrn:String, 
    pwd:String, 
    fName:String, 
    lName:String, 
    join_date:Date, 
    age:Number,
    recent:Array
}));
