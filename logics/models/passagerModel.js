const mongoose = require('mongoose');
const passagerSchema = mongoose.Schema(
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
const Passager = mongoose.model('passager', passagerSchema);
module.exports = Passager;
