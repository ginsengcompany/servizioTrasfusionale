let mongoose = require('mongoose');
let trasfusioniSchema = new mongoose.Schema({
    paziente : {
        uid : String,
        nome : String,
        cognome : String,
        gruppo : String,
        rh : String,
        idReparto : String,
        reparto : String,
        letto : String,
        dataAssegnazioneTrasfusione :String
    },
    datiPrimaTrasfusione : {
        temperatura : Number,
        frequenzaCardiaca : Number,
        pressioneArteriosa : Number
    },
    datiDopoTrasfusione : {
        temperatura : Number,
        frequenzaCardiaca : Number,
        pressioneArteriosa : Number
    },
    trasfusioneEseguita : Boolean,
    note : String,
    inizioTrasfusione : Date,
    fineTrasfusione : {
        type: Date,
        default: null
    },
    ultimoAggiornamento : Date,
    uidInfermiere : String,
    uidMedico : String,
    uidSacca : String,
});
mongoose.model('trasfusioni', trasfusioniSchema);
module.exports = mongoose.model('trasfusioni');
