const mongoose = require('mongoose');
const Ligne = require('./ligneModel.js');
const Compagny = require('./compagnyModel.js');
const Car = require('./carModel.js');
const Machiniste = require('./machinisteModel.js');
const Admin = require('./adminModel.js');
const voyageSchema = mongoose.Schema(
    {
        code:{
            type: String,
            required: true
        },
        nombrePassage:{
            type: Number,
            required: true
        },
        revenu:{
            type: Number,
            required: true
        },
        depart:{
            type: Date,
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
        compagny_id:[
            {type: mongoose.Schema.Types.ObjectId, ref: Compagny}
        ],
        machiniste_id:[
            {type: mongoose.Schema.Types.ObjectId, ref: Machiniste}
        ],
        ligne_id:[
            {type: mongoose.Schema.Types.ObjectId, ref: Ligne}
        ],
        car_id:[
            {type: mongoose.Schema.Types.ObjectId, ref: Car}
        ],
        admin_id:[
            {type: mongoose.Schema.Types.ObjectId, ref: Admin}
        ]
    },
    {
        timesTamps: true
    }
);
const Voyage = mongoose.model('voyage', voyageSchema);
module.exports = Voyage;
