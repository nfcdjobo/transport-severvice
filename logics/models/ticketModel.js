const mongoose = require('mongoose');
const Passager = require('./passagerModel.js');
const Ligne = require('./ligneModel.js');
const Car = require('./carModel.js');
const Compagny = require('./compagnyModel.js');
const Admin = require('./adminModel.js');
const ticketSchema = mongoose.Schema(
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
        compagny_id:[
            {type: mongoose.Schema.Types.ObjectId, ref: Compagny}
        ],
        car_id:[
            {type: mongoose.Schema.Types.ObjectId, ref: Car}
        ],
        ligne_id:[
            {type: mongoose.Schema.Types.ObjectId, ref: Ligne}
        ],
        passager_id:[
            {type: mongoose.Schema.Types.ObjectId, ref: Passager}
        ],
        voyage_id:[
            {type: mongoose.Schema.Types.ObjectId, ref: Passager}
        ],
        admin_id:[
            {type: mongoose.Schema.Types.ObjectId, ref: Admin}
        ]
    },
    {
        timesTamps: true
    }
);
const Ticket = mongoose.model('ticket', ticketSchema);
module.exports = Ticket;
