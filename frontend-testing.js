
/**
 * THIS IS NOT INTENDED FOR SERVER USE
 * THIS IS FOR TESTING FRONT END
 * THERE WILL BE NO SECURITY ATTEMPTS MADE HERE 
 */



var http = require("http");
var pug = require('pug');
var fs = require('fs');

var fileName = "dashboard";

var compiledPugFunc = pug.compileFile("views/"+fileName + ".pug");

var testTexts = {usrn:"SOMEUSERNAME"};

var HTMLstr = compiledPugFunc(testTexts);

fs.writeFileSync("frontend-testing/"+fileName+".html", HTMLstr);

console.log("Done!");