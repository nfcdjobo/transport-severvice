const mongoose = require('mongoose');
const Passager = require('./passagerModel.js');
const Ligne = require('./ligneModel.js');
const Compagny = require('./compagnyModel.js');
const transportSchema = mongoose.Schema(
    {
        code:{
            type: String,
            required: true
        },
        montant:{
            type: Number,
            required: true
        },
        statut:{
            type: Number,
            default: 1,
            required: true
        },
        etat:{
            type: Number,
            default: 1,
            required: true
        },
        createdAt:{
            type: Date,
            required: true
        },
        updatedAt:{
            type: Date,
            required: true
        },
        ligne_id:[
            {type: mongoose.Schema.Types.ObjectId, ref: Ligne}
        ],
        passager_id:[
            {type: mongoose.Schema.Types.ObjectId, ref: Passager}
        ],
        company_id:[
            {type: mongoose.Schema.Types.ObjectId, ref: Compagny}
        ]
    },
    {
        timesTamps: true
    }
);
const Transport = mongoose.model('transport', transportSchema);
module.exports = Transport;
