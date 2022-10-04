


var pug = require('pug');
const roomModel = require('../models/room');
//reduce redundnacy
module.exports.getNthChunk = (cb, room, chunk) => { //the room number, the chunk number (optional, default latest), and how many chinks prior (optional, default 4)

    if (chunk == undefined) {
        //find the latest chunk; it ight be the last one, but im gonna play it safe
        roomModel.find({"room":room}, function(err, res) {
            if (err) {
                console.log("err")
                console.log(err);
                return null;
            }
            var maxChunk = -1; //this should never be the case because the first chunk is c0
            var ind = -1;
            for (var n = 0 ;n != res.length; n++) {
                if (res[n].chunk > maxChunk) {
                    maxChunk = res[n].chunk;
                    ind = n;
                }
            }
            cb(res[ind]);
        })

    } else {
        roomModel.findOne({"room":room,"chunk":chunk}, function(err,res) {
            if (err) return null;
            cb(res)
        })
    }

}

var messageFunction = pug.compileFile("views/message.pug");
var fileFunction = pug.compileFile("views/file.pug");

/**
 * Accepts either an array of JSON msg or a single JSON message
 */
module.exports.HTMLfromMsg = (msg) => {
    console.log("generating HTML from MSG");
    console.log(msg);
    if (Array.isArray(msg)) {
        var toR = "";
        for (var n = 0 ;n != msg.length; n++) {
            if (msg[n].contents.typ == "text")
                toR += messageFunction({"usrn":msg[n].usrn, "msg":msg[n].contents.data})
            if (msg[n].contents.typ == "file") {
                var moreDat = JSON.parse(msg[n].contents.data);
                toR += fileFunction({"usrn":msg[n].usrn, "filename":moreDat.name, "rci":msg[n].rci});
            }
                
               
        }
        return toR;
    } else {
        if (msg.contents.typ == "file") {
            var moreDat = JSON.parse(msg.contents.data);
            return fileFunction({"usrn":msg.usrn, "filename":moreDat.name, "rci":msg.rci})
        } else {
            return messageFunction({"usrn":msg.usrn, "msg":msg.contents.data})
        }
    }
}

module.exports.addMsg = (msgJSON, room, cb) => {
    console.log("ADDMSG PARAMS");
    console.log(msgJSON);
    console.log(room);
    //there is a predefiend format or these
    // {
    //     usrn:<someusername>,
    //     contents: {
    //         typ:("text" or "file"),
    //         data:("string msg" or "filename")
    //     }
    // }
    //first find the youngest chunk

    roomModel.find({"room":room}, async function(err, res) {
        if (err) {
            console.log("err")
            console.log(err);
            return null;
        }
        var maxChunk = -1; //this should never be the case because the first chunk is c0
        var ind = -1;
        console.log("found chunks");
        console.log(res);
        for (var n = 0 ;n < res.length; n++) {
            if (res[n].chunk > maxChunk) {
                maxChunk = res[n].chunk;
                ind = n;
            }
        }
        var nMsgObj = {
            "time": new Date().getTime(),
            "usrn": msgJSON.usrn,
            "contents": msgJSON.contents
        };
        if (ind == -1 || res[ind].msgs.length >= 16) {
            nMsgObj.rci = "" + room + "." + (ind+1) + "." + 0;
            var nChunk = new roomModel({
                "room":room,
                "chunk":ind+1,
                "msgs":[nMsgObj]
            })
            await nChunk.save()
            cb(nMsgObj);

        } else {
            nMsgObj.rci = "" + room + "." + (ind) + "." + res[ind].msgs.length;
            res[ind].msgs.push(nMsgObj);
            await res[ind].save();
            cb(nMsgObj);
        }
    })

    
}
