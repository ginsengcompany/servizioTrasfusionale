let jwt = require('jsonwebtoken');
let bcrypt = require('bcryptjs');
let moment = require('moment');
let log = require('../utils/logger');
let seedTok = "proviamo";

let provette = require('../models/provettes');

exports.datiProvetta = function (req, res) {
    if (!req.body.hasOwnProperty('uid') || !req.headers.hasOwnProperty('access-token'))
        return res.status(400).send("La richiesta non può essere elaborata");
    if (provette.db._readyState !== 1) //Controlla se il database è pronto per la comunicazione
        return res.status(503).send('Il servizio non è momentaneamente disponibile');
    let token = req.headers['access-token'];
    jwt.verify(token, seedTok, function (err, decoded) {
        if (err) return res.status(401).send('Accesso negato');
        provette.findOne({uid: req.body.uid}, function (err, provetta) {
            if (err) return res.status(500).send('Il servizio non è momentaneamente disponibile');
            if (!provetta) return res.status(404).send('Provetta non trovata');
            res.status(200).send(provetta);
        });
    });
};
exports.prelievoEseguito = function (req, res) {
    if (!req.body.hasOwnProperty('uid') || !req.headers.hasOwnProperty('access-token'))
        return res.status(400).send("La richiesta non può essere elaborata");
    if (provette.db._readyState !== 1) //Controlla se il database è pronto per la comunicazione
        return res.status(503).send('Il servizio non è momentaneamente disponibile');
    let token = req.headers['access-token'];
    jwt.verify(token,seedTok, function (err, decoded) {
        if (err) return res.status(401).send('Accesso negato');
        provette.findOne(req.body.uid, function (err, trasfusione) {
            if (err) return res.status(503).send('Il servizio non è momentaneamente disponibile');
            if (!trasfusione) return res.status(404).send('Trasfusione non trovata');
            provetta.uidOperatore = decoded.uidOperatore;
            provetta.trasfusioneEseguita = true;
            trasfusione.save(function (err, trasfusioneUpdate) {
                if (err) return res.status(503).send('Il documento non è stato aggiornato');
                res.status(200).send('Aggiornamento riuscito');
            });
        });
    });
};
