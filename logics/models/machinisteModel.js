const mongoose = require('mongoose');
const Compagny = require('./compagnyModel.js');
const machinisteSchema = mongoose.Schema(
    {
        code:{
            type: String,
            required: true
        },
        nomPrenom:{
            type:String,
            required: true
        },
        email:{
            type: String,
            required: true
        },
        telephone:{
            type: String,
            required: true
        },
        password:{
            type: String,
            required: true
        },
        photo:{
            type: String,
            required: false
        },
        role:{
            type: String,
            required: true,
            default: "MACHINISTE"
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
        ]
    },
    {
        timesTamps: true
    }
);
const Machiniste = mongoose.model('machiniste', machinisteSchema);
module.exports = Machiniste;
