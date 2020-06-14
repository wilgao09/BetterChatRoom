
var AES256 = require('aes256');

var key = 'a1b3e8m21'; //its the fibonacci sequence!

var cipher = AES256.createCipher(key); // i literally have no idea as to what im doing

module.exports.createToken = (UUID) => {
    //note that Date.now() will always return a 13 digit number until sometime in the year 2200
    var toi = Date.now(); //time of issuing 
    console.log(toi);
    var toEncode = UUID + "&" + toi;
    return cipher.encrypt(toEncode);
}

module.exports.dissolveToken = (token) => {
    var plaintext = cipher.decrypt(token);
    return plaintext.split("&");
}

//unit tests
// var myString = "I LIKE TO EAT CHEESE AND BAGELS";

// var token = module.exports.createToken(myString);

// console.log(token);

// console.log(module.exports.dissolveToken(token));