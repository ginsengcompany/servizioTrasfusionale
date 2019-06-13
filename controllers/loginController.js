let jwt = require('jsonwebtoken');
let bcrypt = require('bcryptjs');
let moment = require('moment');
let log = require('../utils/logger');
let seedTok = "proviamo";
let operatore = require('../models/operatores');
exports.loginPage = function(req,res){
    res.render('login')
};

exports.loginMethod = function (req,res) {

    if (!req.body.hasOwnProperty('uid') || !req.body.hasOwnProperty('password'))
        return res.status(400).send("La richiesta non può essere elaborata");
    if (operatore.db._readyState !== 1) //Controlla se il database è pronto per la comunicazione
        return res.status(503).send('Il servizio non è momentaneamente disponibile');
    operatore.findOne({uid: req.body.uid},function (err, user) {
        if (err) return res.status(503).send('Il servizio non è momentaneamente disponibile');
        if (!user || user.password !== req.body.password) return res.status(404).send('Utente non trovato');
        if (!user.abilitato) return res.status(401).send("Accesso negato");
        let token = jwt.sign({id: user._id}, seedTok,{
            //expiresIn: 86400 // expires in 24 hours
        });
        let messageLog = "uid: " + req.body.uid + " auth: true";
        log.info(messageLog)
        res.status(200).send(token);
    });
};
