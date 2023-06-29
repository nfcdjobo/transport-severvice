const mongoose = require('mongoose');
const demandeSchema = mongoose.Schema(
    {
        code:{
            type: String,
            required: true
        },
        nomPrenom:{
            type: String,
            required: true
        },
        email:{
            type: String,
            required: true
        },
        residence:{
            type: String
        },
        sujet:{
            type: String,
            required: true
        },
        contenu:{
            type: String,
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
const Demande = mongoose.model('demande', demandeSchema);
module.exports = Demande;
