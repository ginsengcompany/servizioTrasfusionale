let jwt = require('jsonwebtoken');
let bcrypt = require('bcryptjs');
let moment = require('moment');
let log = require('../utils/logger');
let seedTok = "proviamo";
let pazienti = require('../models/pazientes');

exports.datiPaziente = function (req, res) {
    if (!req.headers.hasOwnProperty('access-token'))
        return res.status(400).send("La richiesta non può essere elaborata");
    if (!req.body.hasOwnProperty('uidPaziente') && !req.body.hasOwnProperty('uid'))
        return res.status(400).send("La richiesta non può essere elaborata");
    let uidPaziente = !req.body.hasOwnProperty('uidPaziente') ? req.body.uid : req.body.uidPaziente;
    if (pazienti.db._readyState !== 1) //Controlla se il database è pronto per la comunicazione
        return res.status(503).send('Il servizio non è momentaneamente disponibile');
    let token = req.headers['access-token'];
    jwt.verify(token, seedTok, function (err, decoded) {
        if (err) return res.status(401).send('Accesso negato');
        pazienti.findOne({uid: uidPaziente}, function (err, paziente) {
            if (err) return res.status(500).send('Il servizio non è momentaneamente disponibile');
            if (!paziente) return res.status(404).send('Paziente non trovato');
            res.status(200).send(paziente);
        });
    });
};
exports.datiPazienteGet = function (req, res) {
    if (!req.query.hasOwnProperty('uid'))
        return res.status(400).send("La richiesta non può essere elaborata");
    let uidPaziente = req.query.uid;
    if (pazienti.db._readyState !== 1) //Controlla se il database è pronto per la comunicazione
        return res.status(503).send('Il servizio non è momentaneamente disponibile');
        pazienti.findOne({uid: uidPaziente}, function (err, paziente) {
            if (err) return res.status(500).send('Il servizio non è momentaneamente disponibile');
            if (!paziente) return res.status(404).send('Paziente non trovato');
            res.status(200).send(paziente);
        });
};
