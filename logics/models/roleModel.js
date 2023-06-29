const mongoose = require('mongoose');
const roleSchema = mongoose.Schema(
    {
        code:{
            type: String,
            required: true
        },
        libelle:{
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
        }
        
    },
    {
        timesTamps: true
    }
);
const Role = mongoose.model('role', roleSchema);
module.exports = Role;
