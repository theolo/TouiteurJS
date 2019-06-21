const url = 'http://touiteur.cefim-formation.org'

function GetList(ts, callback) {
    const request = new XMLHttpRequest();
    request.open('GET', url + '/list?ts=' + encodeURIComponent(ts), true);
    request.addEventListener('readystatechange', function() {
        if(request.readyState === XMLHttpRequest.DONE && request.status === 200) {
            callback(JSON.parse(request.responseText));
        }
    });
    request.send();
}

function Send(name, message, callback) {
    let messToSend = encodeURIComponent(message);
    let pseuToSend = encodeURIComponent(name);
    let rep = "name=" + pseuToSend + "&message=" + messToSend;
    const request = new XMLHttpRequest();
    request.open("POST", url + "/send", true);
    request.addEventListener('readystatechange', function() {
        if(request.readyState === XMLHttpRequest.DONE && request.status === 200) {
            callback(JSON.parse(request.responseText));
        }
    });
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    request.send(rep);
}

function GetTrending(callback) {
    const request = new XMLHttpRequest();
    request.open('GET', url + '/trending', true);
    request.addEventListener('readystatechange', function() {
        if(request.readyState === XMLHttpRequest.DONE && request.status === 200) {
            callback(JSON.parse(request.responseText));
        }
    });
    request.send();
}

export {GetList, Send, GetTrending}