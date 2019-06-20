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
