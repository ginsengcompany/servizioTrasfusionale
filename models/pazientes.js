let mongoose = require('mongoose');
let pazienteSchema = new mongoose.Schema({
    uid: String,
    nome: String,
    cognome: String,
    gruppo: String,
    rh: String,
    reparto: String,
    letto : Number,
    dataAssegnazioneTrasfusione: String
});
mongoose.model('paziente', pazienteSchema);
module.exports = mongoose.model('paziente');