function OnShowView(idx) {
    console.log("ViewFunction In : " + idx);

    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        console.log('DONE: ', xhr.status);

        if (xhr.status == 201) {
            console.log(xhr.responseText);
        } else {
            console.error(xhr.responseText);
        }
    }
     
    xhr.open('GET', '/view');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({}));
}

function OnShowComment(idx)
{
    console.log("ShowComment In");

    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        console.log('DONE: ', xhr.status);

        if (xhr.status == 200) {
            console.log(xhr.responseText);
        } else {
            console.error(xhr.responseText);
        }
    }

    xhr.open('GET', '/view' + "/comment" + "?=" + idx);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({}));
}