const mongoose = require('mongoose');
const compagnySchema = mongoose.Schema(
    {
        code:{
            type: String,
            required: true
        },
        raisonSociale:{
            type: String,
            required: true
        },
        acronyme:{
            type:String,
            required: false
        },
        photo:{
            type:String,
            required: false
        },
        slogan:{
            type:String,
            required: false
        },
        email:{
            type: String,
            required: true
        },
        telephone:{
            type: String,
            required: true
        },
        dateCreation:{
            type: Date,
            required: false
        },
        copyright:{
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
        },
    },
    {
        timesTamps: true
    }
);
const Compagny = mongoose.model('compagny', compagnySchema);
module.exports = Compagny;

