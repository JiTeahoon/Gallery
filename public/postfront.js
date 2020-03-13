function OnShowView(idx) {
    console.log("ViewFunction In : " + idx);
    document.getElementById('postidx').value = `${idx}`;

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

document.getElementById("commentregister").addEventListener("click", function() {
    var commet = document.getElementById("commentinput").value
    var idx = document.getElementById('postidx').value

    var xhr = new XMLHttpRequest();
    xhr.onload = function(){
        if(xhr.status === 200){
            console.log(xhr.responseText);
        } else {
            console.error(xhr.responseText);
        }
    }

    xhr.open('POST', '/view' + "/comment" + "?=" + idx);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({commet : commet}));
})