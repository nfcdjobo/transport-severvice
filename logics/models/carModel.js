const mongoose = require('mongoose');
const Admin = require('./adminModel');
const Compagny = require('./compagnyModel');
const Ligne = require('./ligneModel');
const carSchema = mongoose.Schema(
    {
        code:{
            type: String,
            required: true
        },
        marque:{
            type:String,
            required: false
        },
        place:{
            type: Number,
            required: true
        },
        climatisation:{
            type: Boolean,
            required: true,
            default: false
        },
        photo:{
            type:String
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
        ligne_id:[
            {type: mongoose.Schema.Types.ObjectId, ref: Ligne}
        ],
        createdAt:{
            type: Date,
            required: true
        },
        updatedAt:{
            type: Date,
            required: true
        },
    },
    {
        timesTamps: true
    }
);
const Car = mongoose.model('car', carSchema);
module.exports = Car;
