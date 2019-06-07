let jwt = require('jsonwebtoken');
let bcrypt = require('bcryptjs');
let moment = require('moment');
let seedTok = "proviamo";
let log = require('../utils/logger');
let sacche = require('../models/sacche');

exports.getSacca = function (req, res) {
    if (!req.body.hasOwnProperty('uid') || !req.headers.hasOwnProperty('access-token'))
        return res.status(400).send("La richiesta non può essere elaborata");
    if (sacche.db._readyState !== 1) //Controlla se il database è pronto per la comunicazione
        return res.status(503).send('Il servizio non è momentaneamente disponibile');
    let token = req.headers['access-token'];
    jwt.verify(token,seedTok,function (err, decoded) {
        if (err) return res.status(401).send('Accesso negato');
        sacche.findOne({uid: req.body.uid},function (err, sacca) {
            if (err) return res.status(503).send('Il servizio non è momentaneamente disponibile');
            if (!sacca) return res.status(404).send('Sacca non trovata');
            res.status(200).send(sacca);
        });
    });
};
