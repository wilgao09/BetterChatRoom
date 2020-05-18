
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('test');
});

router.post('/nUser', function(req,res,next) {
    console.log("gotten");
    res.render('index',{title:"success"});
});


module.exports = router;


