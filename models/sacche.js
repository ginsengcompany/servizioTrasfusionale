let mongoose = require('mongoose');
let saccheSchema = new mongoose.Schema({
    uid: String,
    uidPaziente: String
});
mongoose.model('sacche', saccheSchema);
module.exports = mongoose.model('sacche');