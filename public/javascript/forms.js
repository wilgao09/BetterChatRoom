/**
 * Custom forms so I can actually hear back from server
 */

 /**
  * Submit data to a server, POST by default
  * @param {*} strId the id for the form (or the element containing the labels)
  */
function submitForm(strId, action, callback, method="POST") {
    var url = "http://" + window.location.hostname + ":6689" + action;
    var form = document.getElementById(strId);
    var inputs = form.getElementsByTagName("input");
    console.log(form);
    console.log(inputs);
    // for (var n = 0 ; n != labels.length; n++) {
    //     var inps = labels[n].getElementsByTagName("input");
    //     if (inps.length > 0) inputs.push(inps[0]);
    // }
    if (inputs.length > 0) url += "?";
    console.log(inputs);
    for (var ind = 0; ind != inputs.length; ind++) {
        if (ind != 0) url += "&";
        url += inputs[ind].name + "=" + inputs[ind].value.trim(); 
    }
    console.log(url);
    // nBody = {}
    // for (var n = 0 ;n != inputs.length; n++) {
    //     nBody[inputs[n].name] = inputs[n].value;
    // }
    // console.log(nBody);
    var req = new XMLHttpRequest();
    req.open(method,url,true);
    req.onload = callback;
    // console.log(JSON.stringify(req));
    req.send();
}

