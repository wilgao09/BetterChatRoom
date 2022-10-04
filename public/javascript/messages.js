

var socket = io();

socket.on("nMsg", function(msgHTML) {
    document.getElementById("log").innerHTML += msgHTML;
})

if (localStorage.getItem("currRoom") == null) {
    localStorage.setItem("currRoom",0);
}

function sendTxt(text) {
    if (text == "") return;
    console.log("SENDING NEXT MSG :: " + text);
    var room = localStorage.getItem("currRoom");
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
    }));
}

function sendFile(HTMLEl) {
    if (HTMLEl.files.length > 0) {
        console.log("sending file?!?");
        var room = localStorage.getItem("currRoom");
        var xhr = new XMLHttpRequest();
        var url = "http://" + window.location.hostname + `:6689/rooms/${room}/nMsg`;
        xhr.open("POST",url,true);

        //NEED TO WRITE ONLOAD
        xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
        var fr = new FileReader();
        fr.onload = function(file) {
            xhr.send(JSON.stringify({
                contents: {
                    typ:"file",
                    data:JSON.stringify({
                        name:HTMLEl.value,
                        bin: fr.result
                    })
                }
            }))
        };

        fr.readAsBinaryString(HTMLEl.files[0]);
    }

}

function sendMsg() {
    sendTxt(document.getElementById('inputBar').value);
    sendFile(document.getElementById('fileInput'));
}


function goToRoom(name) {
    console.log("attempting to connect to room " + name);
    name = JSON.stringify(name);
    localStorage.setItem("currRoom",name);
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

goToRoom(localStorage.getItem("currRoom"))