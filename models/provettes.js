let mongoose = require('mongoose');
let provetteSchema = new mongoose.Schema({
    uid:{
        type: String,
        unique: true
    },
    uidOperatore: String,
    uidPaziente: String,
    prelievoEseguito:{
        type: Boolean,
        default:false
    }
});
mongoose.model('provette', provetteSchema);
module.exports = mongoose.model('provette');
