// function OnShowLoginDialog() {
//     $(`#${"loginDialog"}`).dialog({
//         modal: true,
//         buttons: {
//             "수정": function () {
//                 $(this).dialog('close');

//                 var xhr = new XMLHttpRequest();
//                 xhr.onload = function () {
//                     console.log('DONE: ', xhr.status);

//                     if (xhr.status == 200) {
//                         console.log(xhr.responseText);
//                         location.replace('/');
//                     } else {
//                         console.error(xhr.responseText);
//                     }
//                 }

//                 var inputid = 'id';
//                 var id = document.getElementById(inputid).value;

//                 inputid = `password`;
//                 var password = document.getElementById(inputid).value;

//                 xhr.open('POST', '/login');
//                 xhr.setRequestHeader('Content-Type', 'application/json');
//                 xhr.send(JSON.stringify({ id: id, password: password }));
//             },
//         }
//     });
// }