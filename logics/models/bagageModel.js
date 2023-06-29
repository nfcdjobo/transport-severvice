const mongoose = require('mongoose');
const Passager = require('./passagerModel');
const bagageSchema = mongoose.Schema(
    {
        code:{
            type: String,
            required: true
        },
        contenu:{
            type: String,
            required: true
        },
        masse:{
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
        passager_id:[
            {type: mongoose.Schema.Types.ObjectId, ref: Passager}
        ],
        voyage_id:[
            {type: mongoose.Schema.Types.ObjectId, ref: Passager}
        ],
        ticket_id:[
            {type: mongoose.Schema.Types.ObjectId, ref: Passager}
        ]
    },
    {
        timesTamps: true
    }
);
const Bagage = mongoose.model('bagage', bagageSchema);
module.exports = Bagage;
