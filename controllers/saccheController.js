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
exports.getSacche = function (req, res) {
    if (!req.headers.hasOwnProperty('access-token'))
        return res.status(400).send("La richiesta non può essere elaborata");
    if (sacche.db._readyState !== 1) //Controlla se il database è pronto per la comunicazione
        return res.status(503).send('Il servizio non è momentaneamente disponibile');
    let token = req.headers['access-token'];
    jwt.verify(token,seedTok,function (err, decoded) {
        if (err) return res.status(401).send('Accesso negato');
        sacche.find({},function (err, sacche) {
            if (err) return res.status(503).send('Il servizio non è momentaneamente disponibile');
            if (!sacche) return res.status(404).send('Sacche non trovate');
            res.status(200).send(sacche);
        });
    });
};


exports.postNuovaSacca = function (req, res) {

        if (!req.body.uid)
            return res.status(400).send("La richiesta non può essere elaborata");
        else{
            let sacca = new sacche(req.body);
            sacca.save(function (err,sacca) {
                if (err)
                    return  res.status(400).send(err);
                res.status(200).send(sacca);
            });
        }
};

exports.postModificaFase = function(req,res) {
    let sacca = new sacche(req.body);
    req.body.fase++;
    if(req.body.fase === 2){
        sacca.update({
            fase: req.body.fase,
            laboratorioProvenienza: req.body.laboratorioProvenienza,
            fenotipo: req.body.fenotipo,
            laboratorioAnalisi: req.body.laboratorioAnalisi
        }, function (err, affected, resp) {
            if (err)
                return res.status(400).send(err);
            return res.status(200).send(affected);
        });
    }
    else if(req.body.fase === 3){
        sacca.update({
            fase: req.body.fase,
            tipoEmoderivato: req.body.tipoEmoderivato,
            tipoLavorazione: req.body.tipoLavorazione
        }, function (err, affected, resp) {
            if (err)
                return res.status(400).send(err);
            return res.status(200).send(affected);
        });
    }
    else if(req.body.fase === 4){
        sacca.update({
            fase: req.body.fase,
            dateScadenza: req.body.dateScadenza
        }, function (err, affected, resp) {
            if (err)
                return res.status(400).send(err);
            return res.status(200).send(affected);
        });
    }
    else if(req.body.fase === 5){
        sacca.update({
            fase: req.body.fase,
            dataSomministrazione: req.body.dataSomministrazione,
            medicoResponsabile: req.body.medicoResponsabile,
            infermiereResponsabile: req.body.infermiereResponsabile,
            nosograficoPaziente: req.body.nosograficoPaziente
        }, function (err, affected, resp) {
            if (err)
                return res.status(400).send(err);
            return res.status(200).send(affected);
        });
    }
    else
        return res.status(400).send("Non esistono ulteriori fasi di lavorazione!");
};
exports.nuovaSacca = function(req,res){
    res.render('nuovaSacca')
};
exports.dettagliSacca = function(req,res){
    res.render('dettagliSacca')
};

