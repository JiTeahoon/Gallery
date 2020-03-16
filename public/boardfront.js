document.getElementById('searchbtn').addEventListener('click', function(e) {
    var o = document.getElementById('searchoption');
    var option = o.options[o.selectedIndex].value;

    var searchText = document.getElementById('searchtext').value;
    
    if(searchText.length < 2)
    {
        return alert("검색 단어는 2글자 이상이어야 됩니다.")
    }

    var text = encodeURIComponent(searchText);
    var urlquery = `http://localhost:3000/board/?s_type=${option}&s_keyword=${text}`;

    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.status === 200) {
            console.log(xhr.responseText);
            location.replace(urlquery);
        } else {
            console.error(xhr.responseText);
        }
    }
    
    xhr.open('GET', urlquery, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send({'s_keyword=' : encodeURIComponent(searchText), 's_type=' : option});

    document.getElementById('searchtext').value = '';
});

document.getElementById('writebtn').addEventListener('click', function(e) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.status === 200) {
            console.log(xhr.responseText);
            location.replace('http://localhost:3000/write');
            //location.replace(urlquery);
        } else {
            console.error(xhr.responseText);
        }
    }

    xhr.open('GET', '/board/write');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send({});
})

function deletePost(postIdx){
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.status === 200) {
            console.log(xhr.responseText);
            //location.replace(urlquery);
        } else if(xhr.status === 500){
            return alert("글을 삭제할 수 없습니다.");
        } else {
            console.error(xhr.responseText);
        }
    }

    xhr.open('DELETE', '/board/delete');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({postIdx : postIdx}));
}