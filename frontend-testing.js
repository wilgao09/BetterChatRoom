
/**
 * THIS IS NOT INTENDED FOR SERVER USE
 * THIS IS FOR TESTING FRONT END
 * THERE WILL BE NO SECURITY ATTEMPTS MADE HERE 
 */



var http = require("http");
var pug = require('pug');
var fs = require('fs');
var sass = require('node-sass');
var ncp = require('ncp').ncp;

var fileName = "dashboard";

var compiledPugFunc = pug.compileFile("views/"+fileName + ".pug");

var testTexts = {usrn:"SOMEUSERNAME"};

var HTMLstr = compiledPugFunc(testTexts);

fs.writeFileSync("frontend-testing/"+fileName+".html", HTMLstr);

console.log("Compiled HTML");

/**
 * Just render all of the sass and stuff
 */

 fs.readdir("public/stylesheets", function(err, files) {
    console.log(files);
    for (var n = 0 ;n != files.length; n++) {
        // check if sass or scss file
        var ext = files[n].substring(files[n].indexOf("."));
        if (ext == ".sass" || ext == ".scss") {
            console.log("processing " + files[n]);
            var result = sass.renderSync({file:"public/stylesheets/"+files[n]});
            var fileName = files[n].substring(0,files[n].indexOf("."));
            fs.writeFile("frontend-testing/stylesheets/" + fileName + ".css", result.css.toString(), function(err) {
                console.log("Finished rendering");
            
            });
            // sass.render({file:"public/stylesheets/"+files[n]}, function(err, result) {
            //     console.log(files[n]);
            //     console.log(n);
            //     console.log("^^files");
            //     var fileName = files[n].substring(0,files[n].indexOf("."));
            //     fs.writeFile("frontend-testing/stylesheets/" + fileName + ".css", result.css.toString(), function(err) {
            //         console.log("error in rednering");
            //         console.log(err);
            //     });
            // })
        }
    }
 })

 console.log("Compiled Sass!");

ncp('public/javascript','frontend-testing/javascript', function(err) {
    console.log("Copied JS!");
});

