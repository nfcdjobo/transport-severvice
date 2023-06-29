const Reservation = require('../models/reservationModel');
const Passager = require('../models/passagerModel');
const Ligne = require('../models/ligneModel');
const { static } = require('express');
const bcrypt = require('bcrypt');
const { ObjectId } = require('bson');
class ReservationController{
    static saveReservation(req, res){
        try {
            let code = 1;
            Passager.find({}).then((all)=>{if(all.length > 0) code = all.length+1;});
            let ref=1;
            Reservation.find({}).then(tout=>{if(tout.length > 0) ref = tout.length+1;});
            Passager.findOne({email:req.body.email, statut:1})
            .then(passager=>{
                if(!passager){
                    bcrypt.hash('123456', 10)
                    .then(hash=>{
                        const donnePass={
                            code: `PASSAGER${code}`,
                            nomPrenom: req.body.nomPrenom,
                            email:req.body.email,
                            telephone: req.body.telephone,
                            password:hash,
                            createdAt:new Date(),
                            updatedAt:new Date()
                        };
                        let newPassager = new Passager(donnePass);
                        newPassager.save()
                        .then((newPass)=>{
                            Ligne.findById(req.body.ligne_id.split('#')[0])
                            .then(myLigne=>{
                                const donneeRes={
                                    code:`RESERV${ref}`,
                                    passage_id:newPass._id,
                                    ligne_id: myLigne._id,
                                    climatisation: req.body.climatisation==="0"?false: true,
                                    nombre_place: req.body.nombre_place,
                                    sommetTotale: req.body.sommetTotale,
                                    date: new Date(req.body.date),
                                    createdAt:new Date(),
                                    updatedAt:new Date()
                                };
                                let reserve = new Reservation({...donneeRes});
                                reserve.save()
                                .then(response=> {
                                    console.log('succès', response)
                                    newPass.password='123456';
                                    res.status(200).json({user:newPass, reservate:response});
                                }).catch(error=> {
                                    console.log('failed',error.message);
                                    res.status(400).json({msg: error.message});
                                });
                            })
                            .catch(error=>{console.log(error); res.status(401).json({msg:error.message})})
                        })
                        .catch((error)=>{console.log(error); res.status(401).json({msg:error.message})});
                    })
                    .catch((error)=>res.status(401).json({msg:error.message}));
                }else{
                    Ligne.findOne({_id:req.body.ligne_id.split('#')[0]})
                    .then(rero=>{
                        const donneeRes={
                        code:`RESERV${ref}`,
                        passage_id:passager._id,
                        ligne_id: rero._id,
                        climatisation: req.body.climatisation==="0"?false: true,
                        nombre_place: req.body.nombre_place,
                        sommetTotale: req.body.sommetTotale,
                        date: new Date(req.body.date),
                        createdAt:new Date(),
                        updatedAt:new Date()
                        };
                        let reserve = new Reservation({...donneeRes});
                        reserve.save()
                        .then(response=> {
                            console.log('succès2', response);
                            res.status(200).json({reservate:response});
                        }).catch(error=> {
                            console.log('failed2',error.message);
                            res.status(400).json({msg: error.message});
                        });
                    })
                }
            })
        } catch (error) {
            console.log(error);
            res.status(501).json({msg: error.message});
        } 
    }

    static getAllReservation(req, res){
        try{
            Reservation.find({})
            .then(response=>{
                console.log(response);
                res.status(200).json({msg:`Il y a ${response.length} réservation(s).`, reservation:response})
            })
            .catch(error=>{
                console.log('°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°', error);
            })
            
        }catch(error){
            console.log(error)
        }
    }
}

module.exports = ReservationController;