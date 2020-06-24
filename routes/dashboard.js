var express = require('express');
var router = express.Router();

router.use(function(req, res, next) {
    //require credentials
    console.log("DO YOU HAVE AUTH?");
    if (req.auth.usrn == undefined || req.auth.usrn == "NO-ID") {
        console.log("NO AUTH");
        res.status(403).render("redirect",{errCode:403,subtext:"You seem to lack the credentials to access this page. Maybe try logging in?"})
    } else {
        console.log("YES AUTH");
        console.log(req.auth);
        next();
    }    
});

router.get('/', function(req,res,next) {
    console.log("got here, should send off the dashboard");
    console.log(req.auth);
    res.render('dashboard',{usrn:req.auth.usrn});
});

module.exports = router;