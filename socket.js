var socket = require('socket.io');
var socketList = [];

module.exports = (server, app, sessionMiddleware) => {
    var io = socket(server);

    io.use((socket, next) => {
        sessionMiddleware(socket.request, socket.request, next);
    });

    io.on('connection', function (socket) {
        socketList.push(socket);
        console.log('User Join');

        socketList.forEach(function (item, i) {
            console.log(socket.request.session.authId);
            if (item != socket) {
                item.emit('SEND', `${socket.request.session.authId}님이 들어오셧습니다.`);
            }
        });

        socket.on('SEND', function (msg) {
            socketList.forEach(function (item, i) {
                if (item != socket) {
                    item.emit('SEND', `${socket.request.session.authId} : ${msg}`);
                }
            });
        });


        socket.on('disconnect', function () {
            socketList.splice(socketList.indexOf(socket), 1);
            socketList.forEach(function (item, i) {
                console.log(item.id);
                if (item != socket) {
                    item.emit('SEND', `${socket.request.session.authId}님이 나가셧습니다.`);
                }
            });
        });
    });
};
