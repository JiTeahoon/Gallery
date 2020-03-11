function OnShowLoginDialog() {
    $(`#${"loginDialog"}`).dialog({
        modal: true,
        buttons: {
            "수정": function () {
                $(this).dialog('close');

                var xhr = new XMLHttpRequest();
                xhr.onload = function () {
                    console.log('DONE: ', xhr.status);

                    if (xhr.status == 200) {
                        console.log(xhr.responseText);
                        location.replace('/');
                    } else {
                        console.error(xhr.responseText);
                    }
                }

                var inputid = 'id';
                var id = document.getElementById(inputid).value;

                inputid = `password`;
                var password = document.getElementById(inputid).value;

                xhr.open('POST', '/login');
                xhr.setRequestHeader('Content-Type', 'application/json');
                xhr.send(JSON.stringify({ id: id, password: password }));
            },
        }
    });
}

function OnShowView(idx) {
    console.log("ViewFunction In : " + idx);

    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        console.log('DONE: ', xhr.status);

        if (xhr.status == 201) {
            //console.log(xhr.responseText);
            var db = xhr.responseText;
            //게시판 정보 넣기
            console.log(db);

            document.getElementById("title").innerHTML = "변경된 span값";
            document.getElementById("board").innerHTML = "변경된 span값";

            OnShowComment(idx);
        } else {
            console.error(xhr.responseText);
        }
    }

    // xhr.open('GET', '/view');
    // xhr.setRequestHeader('Content-Type', 'application/json');
    // xhr.send(JSON.stringify({}));
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