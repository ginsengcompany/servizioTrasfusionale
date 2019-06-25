let jwt = require('jsonwebtoken');
let bcrypt = require('bcryptjs');
let moment = require('moment');
let seedTok = "proviamo";
let log = require('../utils/logger');
let trasfusioni = require('../models/trasfusionis');


exports.getTrasfusioni = function(req,res){
    res.render('trasfusioniInCorso')
};

exports.postTrasfusioni = function(req,res){
    if (!req.headers.hasOwnProperty('access-token'))
        return res.status(400).send("La richiesta non può essere elaborata");
    if (trasfusioni.db._readyState !== 1) //Controlla se il database è pronto per la comunicazione
        return res.status(503).send('Il servizio non è momentaneamente disponibile');
    let token = req.headers['access-token'];
    jwt.verify(token,seedTok,function (err, decoded) {
        if (err) return res.status(401).send('Accesso negato');
        trasfusioni.find({},function (err, trasfusioni) {
            if (err) return res.status(503).send('Il servizio non è momentaneamente disponibile');
            if (!trasfusioni) return res.status(404).send('Sacche non trovate');
            res.status(200).send(trasfusioni);
        });
    });
};

//Da modificare con Json
exports.insertTrasfusione = function (req, res) {
    if (!req.headers.hasOwnProperty('access-token') || !req.body.hasOwnProperty('uidInfermiere') || !req.body.hasOwnProperty('uidMedico') || !req.body.hasOwnProperty('uidSacca')
        || !req.body.hasOwnProperty('paziente') || !req.body.paziente.hasOwnProperty('reparto') || !req.body.paziente.hasOwnProperty('letto') || !req.body.hasOwnProperty('datiPrimaTrasfusione'))
        return res.status(400).send("La richiesta non può essere elaborata");
    if (trasfusioni.db._readyState !== 1) //Controlla se il database è pronto per la comunicazione
        return res.status(503).send('Il servizio non è momentaneamente disponibile');
    let token = req.headers['access-token'];
    jwt.verify(token,seedTok,function (err, decoded){
        if (err) return res.status(401).send('Accesso negato');
        trasfusioni.create({
            uidInfermiere: req.body.uidInfermiere,
            uidMedico: req.body.uidMedico,
            uidPaziente: req.body.uidPaziente,
            uidSacca: req.body.uidSacca,
            reparto: req.body.reparto,
            letto: req.body.letto,
            paziente: req.body.paziente,
            datiPrimaTrasfusione: {
                temperatura: req.body.datiPrimaTrasfusione.temperatura,
                frequenzaCardiaca: req.body.datiPrimaTrasfusione.frequenzaCardiaca,
                pressioneArteriosa: req.body.datiPrimaTrasfusione.pressioneArteriosa,
            },
            inizioTrasfusione: moment().format('DD/MM/YYYY HH:mm:ss')
        }, function (err, trasfusioneCreata) {
            if (err) return res.status(503).send('Il documento della trasfusione non è stato creato');
            res.status(201).send("Il documento della trasfusione è stato creato")
        });
    });
};

exports.listTrasfusioniForReparto = function (req, res) {
    if (!req.headers.hasOwnProperty('access-token') || !req.headers.hasOwnProperty('reparto'))
        return res.status(400).send("La richiesta non può essere elaborata");
    if (trasfusioni.db._readyState !== 1) //Controlla se il database è pronto per la comunicazione
        return res.status(503).send('Il servizio non è momentaneamente disponibile');
    let token = req.headers['access-token'];
    jwt.verify(token,seedTok,function (err, decoded) {
        if(err) return res.status(401).send('Accesso negato');
        trasfusioni.find({$and:[
                {"paziente.idReparto": req.headers.reparto},{fineTrasfusione:""}
            ]},function (err, listTrasfusioni) {
            if(err) return res.status(503).send('Il servizio non è momentaneamente disponibile');
            if (!listTrasfusioni || listTrasfusioni.length === 0) return res.status(404).send('Trasfusionali non trovati');
            res.status(200).send(listTrasfusioni);
        });
    });
};

exports.fineTrasfusione = function (req, res) {
    if (!req.headers.hasOwnProperty('access-token') || !req.headers.hasOwnProperty('_id'))
        return res.status(400).send("La richiesta non può essere elaborata");
    if (trasfusioni.db._readyState !== 1) //Controlla se il database è pronto per la comunicazione
        return res.status(503).send('Il servizio non è momentaneamente disponibile');
    let token = req.headers['access-token'];
    jwt.verify(token,seedTok,function (err, decoded) {
        if (err) return res.status(401).send('Accesso negato');
        trasfusioni.findById(req.headers._id, function (err, trasfusione) {
            if (err) return res.status(503).send('Il servizio non è momentaneamente disponibile');
            if (!trasfusione) return res.status(404).send('Trasfusione non trovata');
            trasfusione.trasfusioneEseguita = true;
            trasfusione.fineTrasfusione = moment().format('DD/MM/YYYY hh:mm:ss');
            trasfusione.save(function (err, trasfusioneUpdate) {
                if (err) return res.status(503).send('Il documento non è stato aggiornato');
                res.status(200).send('Aggiornamento riuscito');
            });
        });
    });
};

exports.updateDopoLaTrasfusione = function (req, res) {
    if (!req.headers.hasOwnProperty('access-token') || !req.body.hasOwnProperty('_id') || !req.body.hasOwnProperty('datiDopoTrasfusione'))
        return res.status(400).send("La richiesta non può essere elaborata");
    if (trasfusioni.db._readyState !== 1) //Controlla se il database è pronto per la comunicazione
        return res.status(503).send('Il servizio non è momentaneamente disponibile');
    let token = req.headers['access-token'];
    jwt.verify(token,seedTok, function (err, decoded) {
        if (err) return res.status(401).send('Accesso negato');
        trasfusioni.findById(req.body._id , function (err, trasfusione) {
            if (err) return res.status(503).send('Il servizio non è momentaneamente disponibile');
            if (!trasfusione) return res.status(404).send('Trasfusione non trovata');
            trasfusione.datiDopoTrasfusione.temperatura = req.body.datiDopoTrasfusione.temperatura;
            trasfusione.datiDopoTrasfusione.frequenzaCardiaca = req.body.datiDopoTrasfusione.frequenzaCardiaca;
            trasfusione.datiDopoTrasfusione.pressioneArteriosa = req.body.datiDopoTrasfusione.pressioneArteriosa;
            if(req.body.note)
                trasfusione.note = req.body.note;
            trasfusione.save(function (err, trasfusioneUpdate) {
                if (err) return res.status(503).send('Il documento non è stato aggiornato');
                res.status(200).send('Aggiornamento riuscito');
            });
        });
    });
};
