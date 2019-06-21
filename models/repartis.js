let mongoose = require('mongoose');

let repartiSchema = new mongoose.Schema({
    id : String,
    nomeReparto :String
});
mongoose.model('reparti', repartiSchema);
module.exports = mongoose.model('reparti');
