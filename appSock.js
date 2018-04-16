let io = require('socket.io')(3001);
let moment = require('moment');
const eventUidMedico = 'uidmedico';
const eventUidInfermiere = 'uidinfermiere';
const eventInizioTrasfusione = 'iniziotrasfusione';
const eventFineTrasfusione = 'finetrasfusione';
const eventUidSacca = 'uidsacca';
const eventUidPaziente = 'uidpaziente';
let inizioTrasfusione = false;
let fineTrasfusione = false;
let dataOrarioInizioTrasfusione;
let dataOrarioFineTrasfusione;

io.on('connection', function (socket) {
    let infermiere, medico,sacca,paziente;
    console.log("connesso");
    socket.on(eventUidInfermiere, function (msg) {
        console.log(msg);
        infermiere = msg;
    });
    socket.on(eventUidMedico,function (msg) {
        console.log(msg);
        medico = msg;
    });
    socket.on(eventUidSacca, function (msg) {
        console.log(msg);
        sacca = msg;
    });
    socket.on(eventUidPaziente, function (msg) {
        console.log(msg);
        paziente = msg;
    });
    socket.on('disconnect', function () {
        if (!inizioTrasfusione)
            console.log(moment().format('DD/MM/YYYY hh:mm:ss') + " la sacca " + sacca + " non è stata trasfusa");
        else if (!fineTrasfusione){
            console.log("Errore in connessione durante la trasfusione della sacca " + sacca + " al paziente " + paziente);
            console.log("Inizio trasfusione: " + dataOrarioInizioTrasfusione + " Interruzione: " + moment().format('DD/MM/YYYY hh:mm:ss'));
        }
        else{
            console.log("La trasfusione della sacca " + sacca + " è avvenuta con successo verso il paziente " + paziente);
            console.log("Infermiere: " + infermiere + " medico: " + medico);
            console.log("Inizio Trasfusione: " + dataOrarioInizioTrasfusione + " fine trasfusione: " + dataOrarioFineTrasfusione);
        }
    });
    socket.on(eventInizioTrasfusione,function () {
        inizioTrasfusione = true;
        dataOrarioInizioTrasfusione = moment().format('DD/MM/YYYY hh:mm:ss');
    });
    socket.on(eventFineTrasfusione, function () {
        fineTrasfusione = true;
        dataOrarioFineTrasfusione = moment().format('DD/MM/YYYY hh:mm:ss');
    });
});