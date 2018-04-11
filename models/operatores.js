let mongoose = require('mongoose');
let operatoreSchema = new mongoose.Schema({
    uid: String,
    nome: String,
    password: String,
    cognome: String,
    tipoOperatore: String,
    codice_operatore: Number,
    abilitato: Boolean
});

mongoose.model('operatore', operatoreSchema);

module.exports = mongoose.model('operatore');