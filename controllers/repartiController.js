let jwt = require('jsonwebtoken');
let bcrypt = require('bcryptjs');
let seedTok = "proviamo";
let log = require('../utils/logger');
let reparti = require('../models/reparti');
let moment = require('moment');

exports.listaReparti = function (req, res) {
    if (!req.headers.hasOwnProperty('access-token'))
        return res.status(400).send("La richiesta non può essere elaborata");
    if (reparti.db._readyState !== 1) //Controlla se il database è pronto per la comunicazione
        return res.status(503).send('Il servizio non è momentaneamente disponibile');
    let token = req.headers['access-token'];
    jwt.verify(token,seedTok,function (err, decoded) {
        if (err) return res.status(401).send('Accesso negato');
        reparti.find({},function (err, repartis) {
            if (err) return res.status(503).send('Il servizio non è momentaneamente disponibile');
            if (!repartis || repartis.length === 0) return res.status(404).send('Reparti non trovati');
            res.status(200).send(repartis);
        });
    });
};