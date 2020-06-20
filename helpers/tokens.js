var secret = "7eso8Eric";
var crypto = require('crypto');

/**
 * AS A WARNING
 * tHE FOLLOWING IS A POOR IMPLEMENTATION OF JWT
 * THE SIGNATURE IS WRONG AND I DONT KNOW WHY
 * 
 */

/**
 * Convert an object into a base64 string
 * @param {JSON} obj Some JSON format object
 * @return {String} obj b64'd
 */
var base64ify = (obj) => {
    var toR = Buffer.from(JSON.stringify(obj)).toString("base64");
    return toR;
}
var unbase64ify = (str) => {
    return Buffer.from(str,"base64").toString("ascii");
}
// secret = base64ify(secret);
var header = {
    alg:"HS256",
    typ:"JWT"
}

var s1 = base64ify(header)

module.exports.createToken = (body) => {
    var hmac = crypto.createHmac("sha256",secret);
    var body64 = base64ify(body);
    var toR = s1+"."+body64;
    hmac.update(toR,'ascii');
    return toR +"."+ hmac.digest('base64'); 
}

module.exports.verify = (token) => {
    if (token == undefined || token == null) return null;
    var parts = token.split(".");
    if (parts.length != 3) return null;
    var nToken = crypto.createHmac("sha256",secret).update(parts[0] +  "." + parts[1]).digest('base64');
    if (parts[2] === nToken){
        return JSON.parse(unbase64ify(parts[1]));
    } else {
        return null;
    }
}

// var testbod = {
//     "sub": "1234567890",
//     "name": "John Doe",
//     "iat": 1516239022
// }

// var tok = module.exports.createToken(testbod)
// console.log(tok);
// console.log(module.exports.verify(tok));