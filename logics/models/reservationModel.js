const mongoose = require('mongoose');
const Ligne = require('./ligneModel');
const Passager = require('./passagerModel');

const reservationSchema = mongoose.Schema(
    {
        code:{
            type: String,
            required: true
        },
         ligne_id:[
            {type: mongoose.Schema.Types.ObjectId, ref: Ligne}
        ],
        passage_id:[
            {type: mongoose.Schema.Types.ObjectId, ref: Passager}
        ],
        climatisation:{
            type: Boolean,
            required: true
        },
        nombre_place:{
            type: Number,
            default: 1,
            required: true
        },
        sommetTotale:{
            type: Number,
            required: true
        },
        date:{
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
        }
        
    },
    {
        timesTamps: true
    }
);
const Reservation = mongoose.model('reservation', reservationSchema);
module.exports = Reservation;
