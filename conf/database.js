

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
    mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser:true,
        user:"Chadmin",
        pass:"taurus222"
    }).then(() => {console.log("CONNECTED")}).catch(()=>{console.log("FAILED")});

    db = mongoose.connection;

    // db.on("error", () => {
    //     console.log("falC");
    //     debug("Failed to connect to database server");

    // });

    // db.once("open", () => {
    //     console.log("connecL");
    //     debug("Successfully connected");
    //     initialized = true;
    // });

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
