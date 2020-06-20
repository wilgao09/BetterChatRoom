var express = require('express');
var router = express.Router();

router.use(function(req, res, next) {
    //require credentials
    if (req.auth == undefined || req.auth == "NO-ID") {
        res.send({valid:"NO-ID"});
    } else {
        next();
    }
    
});

router.use('/', function(req,res,next) {
    console.log("got here, should send off the dashboard");
    res.render('dashboard',{usrn:req.auth.usrn});
});

module.exports = router;