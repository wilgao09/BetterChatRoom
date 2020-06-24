 
var express = require('express');
var router = express.Router();

const roomModel = require('../models/room');
//reduce redundnacy
function getNthChunk(room, chunk, padding=4) { //the room number, the chunk number (optional, default latest), and how many chinks prior (optional, default 4)

    roomModel.find({"room":room}, function(err, res) {
        if (chunk == undefined) {
            //find the latest chunk; it ight be the last one, but im gonna play it safe
            var maxChunk = -1; //this should never be the case because the first chunk is c0
            for (var n = 0 ;n != res.length; n++) {
                if (res[n].chunk > maxChunk) {
                    maxChunk = res[n].chunk;
                }
            }
        }
    })
}

router.post(":room/", function(req,res,next){

})
