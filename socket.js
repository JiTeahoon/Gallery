var socket = require('socket.io');
var socketList = [];

module.exports = (server, app, sessionMiddleware) => {
    var io = socket(server);

    io.use((socket, next) => {
        sessionMiddleware(socket.request, socket.request, next);
    });

    io.on('connection', function (socket) {
        socketList.push(socket);
        console.log(`유저 숫자 : ${socketList.length}`);

        socketList.forEach(function (item, i) {
            console.log(`유저 인덱스 : ${i}, 유저 ID : ${item.request.session.authId}`);

            // socketList.forEach(function (childitem, i) {
            //     childitem.emit('EXIT', `${item.request.session.authId}`);
            // });
            // socketList.forEach(function (childitem, i) {
            //     childitem.emit('ENTER', `${item.request.session.authId}`);
            // });

            if (item != socket)
                item.emit('SEND', `${socket.request.session.authId}님이 들어오셧습니다.`);
        });

        socket.on('SEND', function (msg) {
            socketList.forEach(function (item, i) {
                if (item != socket) {
                    item.emit('SEND', `${socket.request.session.authId} : ${msg}`);
                }
            });
        });

        // socket.on('ENTER', function(msg){
        //     socketList.forEach(function (item, i) {
        //         if (item != socket) {
        //             item.emit('ENTER', `${msg}`);
        //         }
        //     });
        // });

        socket.on('disconnect', function () {
            socketList.splice(socketList.indexOf(socket), 1);
            console.log(`유저 숫자(disconnect) : ${socketList.length}`);

            socketList.forEach(function (item, i) {
                if (item != socket) {
                    //item.emit('EXIT', `${socket.request.session.authId}`);
                    item.emit('SEND', `${socket.request.session.authId}이 나가셧습니다.`);
                }
            });
        });
    });
};
