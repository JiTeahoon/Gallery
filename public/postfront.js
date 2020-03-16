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
    var comment = document.getElementById("commentinput").value
    var idx = document.getElementById('postidx').value
    
    var xhr = new XMLHttpRequest();
    xhr.onload = function(){
        if(xhr.status === 200){
            console.log(xhr.responseText);
            location.replace(`http://localhost:3000/view/?page=${idx}`);
        } else {
            console.error(xhr.responseText);
        }
    }

    var url = '/view' + "/commentregister";
    xhr.open('POST', url);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({comment : comment, idx : idx}));
});

// function register(){
//     for(int i = 0; i <)
// }

function deletePost(postIdx){
    console.log(postIdx);

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
    xhr.send(JSON.stringify({ postIdx: postIdx }));
}

[].forEach(document.querySelectorAll("comment-list tr"), function (e) {
    var idx = 0;
    e.addEventListener('click', function () {
        deletePost(idx);
        idx++;
    })
});