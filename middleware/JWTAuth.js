
var tokens = require('../helpers/tokens');

module.exports = (req,res,next) => {
    console.log(req.cookies);
    var token = req.cookies.JWT;
    if (token == undefined) {
        req.auth = {
            usrn:"NO-ID"
        };
    }
    var cred = tokens.verify(token);
    if (cred == null) {
        req.auth = {
            usrn:"NO-ID"
        };
    } else {
        req.auth = cred;
    }
    next();
}