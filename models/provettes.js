let mongoose = require('mongoose');
let provetteSchema = new mongoose.Schema({
    uid: String,
    uidPaziente: String
});
mongoose.model('provette', provetteSchema);
module.exports = mongoose.model('provette');