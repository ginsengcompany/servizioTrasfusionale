let mongoose = require('mongoose');
mongoose.connect('mongodb://192.168.125.14:27017/Struttura');
mongoose.connection.on("error",function (err) {
    console.error('Errore di connessione al database',err);
});