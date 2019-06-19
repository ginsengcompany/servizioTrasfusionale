let mongoose = require('mongoose');
let saccheSchema = new mongoose.Schema({
        uid: {
                type: String,
                unique: true
        },
        uidPaziente: String,
        uidPersonale:String,
        fase : Number,
        trasfusa:Boolean,
    /*Fase 1*/
        luogoRaccolta : String,
        tipoDonazione : String,
        anticoagulante : String,
        conservante : String,
        volumeEmocomponenti : Number,
        dateStamp : Date,
        durata : String,
        codiceFiscaleDonatore : String,
        esitoDonazione : String,
        tipoEmocomponente : String,
    /*fase2*/
        laboratorioProvenienza : String,
        fenotipo : String,
        laboratorioAnalisi : String,
    /*fase3*/
        tipoEmoderivato : String,
        tipoLavorazione : String,

    /*fase4*/
        dataScadenza : Date,
    /*fase5*/
        dataSomministrazione : String,
        medicoResponsabile : String,
        infermiereResponsabile : String,
        nosograficoPaziente : String
});
mongoose.model('sacche', saccheSchema);
module.exports = mongoose.model('sacche');
