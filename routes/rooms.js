 
var express = require('express');
var router = express.Router();
var pug = require('pug');

var msgs = require('../helpers/messages');
var socket = require('../sockets/rooms');
var chunks = require('../models/room');

router.get('/', function(req,res,next) {
    console.log("rendering?");
    res.render('room',{});
    console.log("rendered");
})

router.get("/:room", function(req,res,next){
    msgs.getNthChunk(function(msg) {
        res.send(msgs.HTMLfromMsg(msg))
    }, req.params.room);
})

router.get("/:room/:chunk", function(req,res,next){
    msgs.getNthChunk(function(msg) {
        res.send(msgs.HTMLfromMsg(msg))
    }, req.params.room, req.params.chunk);
})


router.post("/:room/nMsg", function(req,res,next) {
    console.log(req.body);
    console.log("BODY ^ ^^ ^ ");
    if (req.auth.usrn == undefined || req.auth.usrn == "NO-ID") {
        res.send({valid:"NO-ID"});
    } else {
        //check if valid format
        var bod = req.body;
        if (bod.usrn == undefined || bod.contents == undefined || bod.contents.typ != ("file" || "text") || bod.data == undefined) {
            res.send({valid:"INVALID FORM"});
        } else {
            msgs.addMsg(bod, req.params.room, function(msg) {
                res.send({valid:"VALID"});
                socket.sendMsg(msg);
            })
        }
    }
})

module.exports = router;