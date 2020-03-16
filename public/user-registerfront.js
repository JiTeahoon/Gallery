document.getElementById('overlapbtn').addEventListener('click', function(e) {  
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        console.log('DONE: ', xhr.status);

        if (xhr.status == 200) {
            return alert("사용 가능한 아이디입니다.")
        } else {
            return alert("이 아이디는 등록되어있습니다. 다른 아이디로 다시 중복검사해주세요.")
        }
    }
    var id = document.getElementById('idinput').value;

    if(id === ""){
        return alert('아이디를 입력하세요!');
    }

    xhr.open('GET', '/register/overlap' + "?overlap" + "=" + id);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send({});
});

document.getElementById('registerbtn').addEventListener('click', function(e) {
    var id = document.getElementById('idinput').value;
    var name = document.getElementById('nameinput').value;
    var password = document.getElementById('passwordinput').value;

    if(id === "" || name === "" || password === ""){
        return alert('기입란을 전부 채워주세요!');
    }

    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        console.log('DONE: ', xhr.status);

        if (xhr.status == 200) {
            console.log(xhr.responseText);
            alert("로그인 해주세요");
            location.replace('http://localhost:3000');
        } else {
            console.error(xhr.responseText);
        }
    }

    xhr.open('POST', '/register/register');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({id : id, name : name, password : password}));
})