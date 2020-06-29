

var mongoose = require("mongoose");
var debug = require('debug')('dbinit:');
var dbip = "";
var db;
var initialized = false;


function init() {
    // if (dbip == "") {
    //     debug("No ip set; Aborting");
    //     return;
    // }
    // console.log(`mongodb://${dbip}:8741/ChatRoom`);
    mongoose.connect('mongodb+srv://cluster0-hwwk7.mongodb.net/ChatRoom', {
        useNewUrlParser:true,
        user:"Chadmin",
        pass:"taurus222"
    }); //???

    db = mongoose.connection;

    db.on("error", () => {
        debug("Failed to connect to database server");

    });

    db.once("open", () => {
        debug("Successfully connected");
        initialized = true;
    });

}


// module.exports.setIp = (nIp) => {
//     dbip = nIp;
//     init();
// }

init(); 

module.exports.db = () => {
    // if (!initialized) {
    //     debug("Database not initialized!!");
    // } else {
        return db;
    // }
    return null;
};

// var msgSchema = new mongoose.Schema({
//     date:Date,
//     user:mongoose.Types.ObjectId,
//     type:String,
//     body:String
// });

// module.exports.msgSchema = msgSchema;
// module.exports.collectionList = {
//     "user_logins":mongoose.model("user", new mongoose.Schema({ usrn:String, pwd:String, fName:String, lName:String, join_date:Date, age:Number})),
//     "rooms":mongoose.model("room", new mongoose.Schema({
//         room:Number,
//         chunk:Number,
//         msgs:[msgSchema]
//     }))
// };

module.exports.dbip = dbip;
