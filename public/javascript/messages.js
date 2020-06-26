

var socket = io();

socket.on("nMsg", function(msgHTML) {
    document.getElementById("log").innerHTML += msgHTML;
})

if (sessionStorage.getItem("currRoom") == null) {
    sessionStorage.setItem("currRoom",0);
}

function sendTxt(text) {
    var room = sessionStorage.getItem("currRoom");
    var xhr = new XMLHttpRequest();
    var url = "http://" + window.location.hostname + `:6689/rooms/${room}/nMsg`;
    xhr.open("POST",url,true);

    xhr.onload  = function(){console.log("done")};
    xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
    xhr.send(JSON.stringify({
        contents:{
            typ:"text",
            data: text
        }
    }))

}


function goToRoom(name) {
    console.log("attempting to connect to room " + name);
    name = JSON.stringify(name);
    sessionStorage.setItem("currRoom",name);
    var xhr = new XMLHttpRequest();
    var url = "http://" + window.location.hostname + ":6689/rooms/" + name;
    xhr.open("GET",url,true);
    //this assumes that youre in the main rooms.pug place
    xhr.onload = function() {
        var res = xhr.responseText;
        document.getElementById("log").innerHTML += res;
    }

    xhr.send()
}