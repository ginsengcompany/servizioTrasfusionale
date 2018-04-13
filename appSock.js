let io = require('socket.io')(3001);

io.on('connection', function (socket) {
    console.log("connesso");
    let infermiere, medico;
    socket.on('uidinfermiere', function (msg) {
        console.log(msg);
        infermiere = msg;
    });
    socket.on('uidmedico',function (msg) {
        console.log(msg);
        medico = msg;
    });
    socket.on('disconnect', function () {
        console.log("disconnesso infermiere: " + infermiere + " medico: " + medico);
    });
});