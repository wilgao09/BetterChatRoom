 
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
        
        if (msg == undefined || msg == null) {
            msg = {
                usrn: "Nicholas Cage softly whispers into your ear",
                contents:{
                    typ:"text",
                    data:"There seems to be nothing here, start talking!"
                }
            }
        } else {
            msg = msg.msgs;
        }
        res.send(msgs.HTMLfromMsg(msg))
    }, req.params.room);
})

router.get("/:room/:chunk", function(req,res,next){
    msgs.getNthChunk(function(msg) {
        res.send(msgs.HTMLfromMsg(msg))
    }, req.params.room, req.params.chunk);
})


router.post("/:room/nMsg", function(req,res,next) {
    // console.log(req.body);
    // console.log("BODY ^ ^^ ^ ");
    console.log("INCOMING MESSAGE");
    console.log(req.body);
    if (req.auth.usrn == undefined || req.auth.usrn == "NO-ID") {
        res.send({valid:"NO-ID"});
    } else {
        //check if valid format
        var bod = req.body;
        bod.usrn = req.auth.usrn;
        console.log(bod);
        if (bod.contents == undefined || (bod.contents.typ != "text" && bod.contents.typ != "file") || bod.contents.data == undefined) {
            console.log("INVALID FORM");
            res.send({valid:"INVALID FORM"});
        } else {
            console.log(req.params);
            msgs.addMsg(bod, req.params.room, function(msg) {
                res.send({valid:"VALID"});
                socket.sendMsg(msgs.HTMLfromMsg(msg));
            })
        }
    }
})

module.exports = router;