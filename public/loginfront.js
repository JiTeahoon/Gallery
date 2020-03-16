//로그인 버튼
document.getElementById('loginbutton').addEventListener('click', function(e) {
    console.log('login front scrit In');

    var id = document.getElementById('id').value;
    var password = document.getElementById('password').value;

    if(id === ''){
        document.getElementById('id').value = '';
        document.getElementById('password').value = '';
        return alert('아이디를 입력하세요.');
    }

    if(password === ''){
        document.getElementById('id').value = '';
        document.getElementById('password').value = '';
        return alert('비밀번호를 입력하세요.');
    }

    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.status == 200) {
            console.log(xhr.responseText);
            location.replace('/board');
        } else if(xhr.status == 500){
            e.target.id = '';
            e.target.password = '';
            return alert('비밀번호, 아이디가 틀립니다.');
        } else {
            console.error(xhr.responseText);
        }
    }

    xhr.open('POST', '/login');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({id : id, password : password}));

    document.getElementById('id').value = '';
    document.getElementById('password').value = '';
});

document.getElementById('registerbutton').addEventListener('click', function(e) {
    location.replace('http://localhost:3000/register');
});