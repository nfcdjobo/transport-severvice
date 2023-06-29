const Admin = require('./adminModel.js')
const mongoose = require('mongoose');
const ligneSchema = mongoose.Schema(
    {
        code:{
            type: String,
            required: true
        },
        distance:{
            type: Number,
            required: true
        },
        
        villeA:{
            type: String,
            required: true
        },
        villeB:{
            type: String,
            required: true
        },
        montant:{
            type: Number,
            required: true
        },
        photo:{
            type: String
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
        admin_id:[
            {type: mongoose.Schema.Types.ObjectId, ref: Admin}
        ]
    },
    {
        timesTamps: true
    }
);
const Ligne = mongoose.model('ligne', ligneSchema);
module.exports = Ligne;
