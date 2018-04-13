let jwt = require('jsonwebtoken');
let bcrypt = require('bcryptjs');
let moment = require('moment');
let log = require('../utils/logger');
let seedTok = "proviamo";

exports.controlloModelli = function (req, res) {
    if (!req.body.hasOwnProperty('modello_medico') || !req.body.hasOwnProperty('modello_infermiere') || !req.body.hasOwnProperty('medico') || !req.body.hasOwnProperty('infermiere') || !req.headers.hasOwnProperty('access-token'))
        return res.status(400).send("La richiesta non può essere elaborata");
    let token = req.headers['access-token'];
    jwt.verify(token,seedTok,function (err, decoded) {
        if (err) return res.status(401).send("Accesso negato");
        let modello_infermiere = req.body.modello_infermiere;
        let modello_medico = req.body.modello_medico;
        let controllo_modello_medico = true, controllo_modello_infermiere = true;
        for (let prop in modello_infermiere)
            if (modello_infermiere[prop] === false){
                controllo_modello_infermiere = false;
                break;
            }
        if (controllo_modello_infermiere === false)
            return res.status(200).send(false);
        for (let prop in modello_medico)
            if (modello_medico[prop] === false){
                controllo_modello_medico = false;
                break;
            }
        res.status(200).send(controllo_modello_medico);
    });
};