const mongoose = require('mongoose');
const Compagny = require('./compagnyModel');
const Role = require('./roleModel');
const adminSchema = mongoose.Schema(
    {
        code:{
            type: String,
            required: true
        },
        nomPrenom:{
            type: String,
            required: false
        },
        email:{
            type: String,
            // required: true
        },
        telephone:{
            type: String,
            // required: true
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
            default: "No role",
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
        compagny_id:[
            {type: mongoose.Schema.Types.ObjectId, ref: Compagny}
        ],
        role_id:[
            {type: mongoose.Schema.Types.ObjectId, ref: Role}
        ],
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
const Admin = mongoose.model('admin', adminSchema);
module.exports = Admin;
