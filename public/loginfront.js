//로그인 버튼
document.getElementById('login').addEventListener('submit', function(e) {
    console.log('login front scrit In');

    //e.defaultPrevented();

    var id = e.target.id.value;
    var password = e.target.password.value;
    if(id === ''){
        return alert('아이디를 입력하세요.');
        e.target.id.value = '';
        e.target.password.value= '';
    }

    if(password === ''){
        return alert('비밀번호를 입력하세요.');
        e.target.id.value = '';
        e.target.password.value = '';
    }

    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        console.log('퍽셩 완성');
        if (xhr.status == 201) {
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

    e.target.id.value = '';
    e.target.password.value= '';
});
