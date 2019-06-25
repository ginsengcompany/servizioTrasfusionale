let mongoose = require('mongoose');
let rotteSchema = new mongoose.Schema({
    login : String,
    infoOperatore : String,
    datiPaziente_UID : String
});
mongoose.model('rotte', rotteSchema);
module.exports = mongoose.model('rotte');
