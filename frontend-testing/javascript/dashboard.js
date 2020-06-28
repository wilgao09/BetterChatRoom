


function goToRoom(rn) {
    localStorage.setItem("currRoom",rn);
    window.location = "http://" + window.location.hostname + ":6689/rooms"
}