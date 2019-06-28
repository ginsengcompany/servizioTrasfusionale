let rotte = require('../models/rottes');

exports.listaUrl = function (req, res) {
    if (rotte.db._readyState !== 1) //Controlla se il database è pronto per la comunicazione
        return res.status(503).send('Il servizio non è momentaneamente disponibile');
    rotte.findOne({},function (err, rotte) {
            if (err) return res.status(503).send('Il servizio non è momentaneamente disponibile');
            if (!rotte || rotte.length === 0) return res.status(404).send('Reparti non trovati');
            return res.status(200).send(rotte);
        });
};
    
