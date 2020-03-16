document.getElementById('registerbtn').addEventListener('click', function(e) {
    var title = document.getElementById('titletext').value;
    var post = document.getElementById('posttext').value;

    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.status === 200) {
            console.log(xhr.responseText);
            location.replace('http://localhost:3000/board');
        } else {
            console.error(xhr.responseText);
        }
    }
    
    xhr.open('POST', '/write/register');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({title : title, post : post}));
});

document.getElementById('cancelbtn').addEventListener('click', function(e) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.status === 200) {
            console.log(xhr.responseText);
            location.replace('http://localhost:3000/board');
        } else {
            console.error(xhr.responseText);
        }
    }
    
    xhr.open('GET', '/write/cancel', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send({});
});