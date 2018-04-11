let jwt = require('jsonwebtoken');
let bcrypt = require('bcryptjs');
let moment = require('moment');
let log = require('../utils/logger');
let seedTok = "proviamo";
let operatore = require('../models/operatores');

exports.login = function (req, res) {
    if (!req.body.hasOwnProperty('uid') || !req.body.hasOwnProperty('password'))
        return res.status(400).send("La richiesta non può essere elaborata");
    if (operatore.db._readyState !== 1) //Controlla se il database è pronto per la comunicazione
        return res.status(503).send('Il servizio non è momentaneamente disponibile');
    operatore.findOne({uid: req.body.uid},function (err, user) {
        if (err) return res.status(503).send('Il servizio non è momentaneamente disponibile');
        if (!user || user.password !== req.body.password) return res.status(404).send('Utente non trovato');
        if (user.codice_operatore !== 2) return res.status(401).send("Operatore non abilitato ad effettuare la login di accesso");
        if (!user.abilitato) return res.status(401).send("Accesso negato");
        let token = jwt.sign({id: user._id}, seedTok,{
            //expiresIn: 86400 // expires in 24 hours
        });
        let messageLog = "uid: " + req.body.uid + " auth: true";
        log.info(messageLog);
        res.status(200).send(token);
    });
};

exports.me = function (req, res) {
    if (!req.headers.hasOwnProperty('access-token'))
        return res.status(400).send("La richiesta non può essere elaborata");
    if (operatore.db._readyState !== 1) //Controlla se il database è pronto per la comunicazione
        return res.status(503).send('Il servizio non è momentaneamente disponibile');
    let token = req.headers['access-token'];
    jwt.verify(token,seedTok,function (err, decoded) {
        if (err) return res.status(401).send('Accesso negato');
        operatore.findById(decoded.id,{password: 0}, function (err, user) {
            if (err) return res.status(503).send('Il servizio non è momentaneamente disponibile');
            if (!user) return res.status(404).send('Utente non trovato');
            res.status(200).send(user);
        });
    });
};

exports.loginTrasfusione = function (req, res) {
    if (!req.body.hasOwnProperty('uid') || !req.body.hasOwnProperty('password') || !req.headers.hasOwnProperty('access-token'))
        return res.status(400).send("La richiesta non può essere elaborata");
    if (operatore.db._readyState !== 1) //Controlla se il database è pronto per la comunicazione
        return res.status(503).send('Il servizio non è momentaneamente disponibile');
    let token = req.headers['access-token'];
    jwt.verify(token,seedTok, function (err, decoded) {
        if (err) return res.status(401).send('Accesso negato');
        operatore.findOne({uid: req.body.uid},function (err, user) {
            if (err) return res.status(503).send('Il servizio non è momentaneamente disponibile');
            if (!user || user.password !== req.body.password) return res.status(404).send('Utente non trovato');
            if (user.codice_operatore !== 1) return res.status(401).send("Operatore non abilitato ad effettuare la login di accesso");
            if (!user.abilitato) return res.status(401).send("Accesso negato");
            let messageLog = "uid: " + req.body.uid + " auth: true";
            log.info(messageLog);
            let tokenTrasfusionale = jwt.sign({id: user._id}, seedTok,{
                //expiresIn: 86400 // expires in 24 hours
            });
            res.status(200).send(tokenTrasfusionale);
        });
    });
};