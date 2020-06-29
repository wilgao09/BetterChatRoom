
/**
 * REQUIRES FORMS.JS
 */

function login() {
    submitForm("login", "/checkUser/login", function() {
        console.log("RESPONSE");
        console.log(this);
        var res = JSON.parse(this.responseText);
        switch (res.valid) {
            case("err"):
                alert("There was an error processing your request");
                break;
            case ("incorrect"):
                alert("Invalid credentials");
                break;
            case ("true"):
                alert("VALID!");
                toDashboard();
                break;
            
        }
        console.log("here is res");
        console.log(res);
    });
}

function register() {
    if (document.getElementById("pw1").innerHTML != document.getElementById("pw2").innerHTML) {
        alert("PASSWORDS DO NOT MATCH");
        return;
    }
    submitForm("register","/checkUser/register/createUser", function() {
        // console.log("hello> " + this.responseText);
        alert(this.responseText);
    });
}

function toDashboard() {
    // window.location = "http://" + window.location.hostname + ":6689/dashboard"
    window.location = "https://chatroom8982.herokuapp.com/dashboard"
    // var url = "http://" + window.location.hostname +  ":6689/dashboard";
    // var nReq = new XMLHttpRequest();
    // nReq.open("GET",url,true);
    // nReq.onload = function() {
    //     console.log(this.response);
    //     document = this.response;
    // }
    // nReq.send();
}