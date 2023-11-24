const Admin = require('../models/adminModel');
const Passager = require('../models/passagerModel');
const Machiniste = require('../models/machinisteModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
class ConnexionController{
    static async loginAdmin(req, res){
        try {
            Admin.findOne({email: req.body.email, statut: 1})
            .then((user)=>{
                if(!user){
                    res.status(401).json({msg: "Email incorrect !"})
                }else{
                    bcrypt.compare(req.body.password, user.password)
                    .then((pass) => {
                        console.log('°°°°°°°°',pass)
                        if(!pass) return res.status(400).json({msg:"Mot de passe incorrect !!"});
                        req.auth = {
                            user_id:user._id,
                            user_code: user.code,
                            user_email: user.email,
                            statut: user.statut,
                        };
                        res.status(200).json({
                            user,
                            token: jwt.sign(req.auth, "PRIVATE_TOKEN_KEY", {expiresIn: "24h"}, process.env.JWT_TOKEN_SECRET),
                        })
                    })
                 .catch((error)=> res.status(400).json({error: error}))
                }
            })
            .catch(error=>{
                res.status(400).json({msg:`Ce compte n'existe pas. Cherchez à vous inscrire !`, error:error})
            })
        } catch (error) {
            res.status(500).json({msg: error.message})
        }
    }


    static async loginMachiniste(req, res){
        try {
            Machiniste.findOne({email: req.body.email, statut: 1})
            .then((user)=>{
                if(!user){
                    res.status(401).json({msg: "Email incorrect !"})
                }else{
                 bcrypt.compare(req.body.password, user.password)
                 .then((pass) => {
                    if(!pass) return res.status(401).json({msg:"Mot de passe incorrect !!"})
                    req.auth = {
                        user_id:user._id,
                        user_code: user.code,
                        user_email: user.email,
                        statut: user.statut,
                    };
                    res.status(200).json({
                            user,
                            token: jwt.sign(req.auth, "PRIVATE_TOKEN_KEY", {expiresIn: "24h"}, process.env.JWT_TOKEN_SECRET),
                        })
                    })
                 .catch((error)=> res.status(400).json({error: error}))
                }
            })
            .catch(error=>{
                res.status(400).json({msg:`Ce compte n'existe pas. Cherchez à vous inscrire !`, error:error})
            })
        } catch (error) {
            res.status(500).json({msg: error.message})
        }
    }

    static async loginPassager(req, res){
        try {
            
            Passager.findOne({email: req.body.email, statut: 1})
            .then((user)=>{
                if(!user){
                    res.status(401).json({msg: "Email incorrect !"})
                }else{
                    
                    bcrypt.compare(req.body.password, user.password)
                    .then((pass) => {
                    console.log('°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°', req.body)
                    console.log('::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::',pass)
                    if(!pass) return res.status(401).json({msg:"Mot de passe incorrect !!"})
                    req.auth = {
                        user_id:user._id,
                        user_code: user.code,
                        user_email: user.email,
                        statut: user.statut,
                    };
                    res.status(200).json({
                            user,
                            token: jwt.sign(req.auth, "PRIVATE_TOKEN_KEY", {expiresIn: "24h"}, process.env.JWT_TOKEN_SECRET),
                        })
                    })
                    .catch((error)=> res.status(400).json({error: error}))
                }
            })
            .catch(error=>{
                res.status(400).json({msg:`Ce compte n'existe pas. Cherchez à vous inscrire !`, error:error})
            })
        } catch (error) {
            res.status(500).json({msg: error.message})
        }
    }





    static async verifyAdmin(req, res){
        try {
            Admin.findOne({email: req.body.email, statut: 1})
            .then((user)=>{
                if(!user){
                    res.status(400).json({msg: "Email incorrect !"});
                }else{
                    bcrypt.compare(req.body.password, user.password)
                    .then(pass=>{
                        console.log('---------------------------------------------',pass)
                        if(!pass) return res.status(400).json({msg:"Mot de passe incorrect !!"});
                        res.status(200).json({msg:'Mot de passe correcte !'})
                    })
                    .catch((error)=> res.status(400).json({error: error}))
                }
            })
            .catch(error=>{
                res.status(500).json({msg:`Ce compte n'existe pas. Cherchez à vous inscrire !`, error:error})
            })
        } catch (error) {
            res.status(500).json({msg: error.message})
        }
    }


    static async verifyMachiniste(req, res){
        try {
            console.log('Machiniste', req.body)
            Machiniste.findOne({email: req.body.email, statut: 1})
            .then((user)=>{
                console.log(user)
                if(!user){
                    res.status(400).json({msg: "Email incorrect !"})
                }else{
                    bcrypt.compare(req.body.password, user.password)
                    .then((pass) => {
                        console.log(',,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,',pass)
                        if(!pass) return res.status(400).json({msg:"Mot de passe incorrect !!"});
                        res.status(200).json({msg:'Mot de passe correcte !'})
                        })
                    .catch((error)=> res.status(400).json({error: error}))
                }
            })
            .catch(error=>{
                res.status(500).json({msg:`Ce compte n'existe pas. Cherchez à vous inscrire !`, error:error})
            })
        } catch (error) {
            res.status(500).json({msg: error.message})
        }
    }

    

    static async verifyPassager(req, res){
        try {
            console.log('Passager', req.body)
            Passager.findOne({email: req.body.email, statut: 1})
            .then((user)=>{
                console.log(user)
                if(!user){
                    res.status(400).json({msg: "Email incorrect !"})
                }else{
                    bcrypt.compare(req.body.password, user.password)
                    .then((pass) => {
                        console.log(',,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,',pass)
                        if(!pass) return res.status(400).json({msg:"Mot de passe incorrect !!"});
                        res.status(200).json({msg:'Mot de passe correcte !'})
                    })
                    .catch((error)=> res.status(400).json({error: error}))
                }
            })
            .catch(error=>{
                res.status(500).json({msg:`Ce compte n'existe pas. Cherchez à vous inscrire !`, error:error})
            })
        } catch (error) {
            res.status(500).json({msg: error.message})
        }
    }
}

module.exports = ConnexionController; 


