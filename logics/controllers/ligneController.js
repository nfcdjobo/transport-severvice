// const Compagny = require('../models/compagnyModel');
const Ligne = require('../models/ligneModel');
const Admin = require('../models/adminModel');
class LigneController{
    static async create(req, res){ // On trouve en fonction de la cle primière du catégorie
        try{
            let code = 1;
            Admin.findOne({_id:req.auth.user_id, code:req.auth.user_code, email:req.auth.user_email, statut:req.auth.statut})
            .then(admin=>{
                if(admin){
                        Ligne.findOne({villeA: req.body.villeA, villeB: req.body.villeB})
                        .then(ligne=>{
                            if(ligne){console.log("Vous n'avez pas fournir assez d'informations pour pouvoir effectuer cette requette. Veuillez donc vous connecter pour y parvenir.");return res.status(400).json({msg: "Vous n'avez pas fournir assez d'informations pour pouvoir effectuer cette requette. Veuillez donc vous connecter pour y parvenir."})}
                            Ligne.find({})
                            .then((all)=>{
                                if(all.length > 0) {code = all.length+1;}
                                Ligne.findOne({villeA: req.body.villeA, villeB: req.body.villeB, statut:1})
                                .then(line=>{
                                    if(line) res.status(401).json({msg: `Cette ligne est a été déjà ajoutée.`});
                                    if(req.file){req.body.photo=req.file.path;}
                                    let newLigne = new Ligne({... req.body, code: `LIGNE${code}`, createdAt:new Date(), updatedAt:new Date()});
                                    newLigne.save()
                                    .then((add)=>{
                                        console.log(add);
                                        res.status(200).json({msg:"Ligne ajoutée avec succès !", ligne: add})
                                    })
                                    .catch((error)=>{
                                        console.log(error);
                                        res.status(401).json({msg:error.message});
                                    });
                                })
                                .catch(error=>{
                                    console.log(error.message, error);
                                    res.status(500).json({msg: "Une erreur est survenue lorsque de l'enregistrement, veuillez donc réessayer dans quelques instants", error: error})
                                })
                            });
                                
                        })
                        .catch(error=>{
                            res.status(501).json({msg: "Réquette erronnée", error: error})
                        })
                    }else{
                        res.status(500).json({msg: "Veuillez d'abord vous authentifier !"});
                        return
                    }
                }
            )
            .catch((error)=>{
                res.status(500).json({msg: error.message});
            })
        }catch(error){
            const message = `URL non valable`;
            res.status(500).json({msg: message, data: error.message});
        }
    }

    static async allLigne(req, res){
        try{
            let code = 1;
            // Admin.findOne({_id:req.auth.user_id, code:req.auth.user_code, email:req.auth.user_email, statut:req.auth.statut})
            // .then(admin=>{
            //     if(!admin) return res.status(400).json({msg: `Veuillez vous authentifier pour avoir accès aux données demandées`})
                Ligne.find({statut:1}).then(ligne=>{
                    res.status(200).json({msg: `Il y a ${ligne.length} élément(s) trouvé(s)`, data: ligne})
                }).catch(error=>{
                    console.log(error.message, error);
                    res.status(400).json({msg: `Veuillez rensiegner une url correct`, error: error})
                })
            // })
            // .catch(error=>{
            //     res.status(400).json({msg: `Veuillez rensiegner une url correct`, error: error})
            // })
        }catch(error){
            res.status(500).json({msg})
        }
    }


    static async getLigne(req, res){
        try{
            let code = 1;
            Ligne.find({statut:1}).then(ligne=>{
                res.status(200).json({msg: `Il y a ${ligne.length} élément(s) trouvé(s)`, data: ligne})
            })
            .catch(error=>{
                console.log(error.message, error);
                res.status(400).json({msg: `Veuillez rensiegner une url correct`, error: error})
            })
        }catch(error){
            res.status(500).json({msg})
        }
    }

    static async getById(req, res){
        try{
            let code = 1;
            Admin.findOne({_id:req.auth.user_id, code:req.auth.user_code, email:req.auth.user_email, statut:req.auth.statut})
            .then(admin=>{
                if(!admin) return res.status(400).json({msg: `Veuillez vous authentifier pour avoir accès aux données demandées`})
                Ligne.findOne({_id: req.params.id, statut:1})
                .then(ligne=>{
                    res.status(200).json({msg: `Un élément est retrouvé`, data: ligne})
                }).catch(error=>{
                    console.log(error.message, error);
                    res.status(400).json({msg: `Veuillez rensiegner une url correct`, error: error})
                })
                
            })
            .catch(error=>{
                res.status(400).json({msg: `Veuillez rensiegner une url correct`, error: error})
            })
        }catch(error){
            res.status(500).json({msg})
        }
    }

    static async getByCode(req, res){
        try{
            let code = 1;
            Admin.findOne({_id:req.auth.user_id, code:req.auth.user_code, email:req.auth.user_email, statut:req.auth.statut})
            .then(admin=>{
                if(!admin) return res.status(400).json({msg: `Veuillez vous authentifier pour avoir accès aux données demandées`})
                Ligne.findOne({code: req.body.code, statut:1})
                .then(ligne=>{
                    res.status(200).json({msg: `Un élément est retrouvé`, data: ligne})
                }).catch(error=>{
                    console.log(error.message, error);
                    res.status(400).json({msg: `Veuillez rensiegner une url correct`, error: error})
                })
                
            })
            .catch(error=>{
                res.status(400).json({msg: `Veuillez rensiegner une url correct`, error: error})
            })
        }catch(error){
            res.status(500).json({msg})
        }
    }

    static async getByVille(req, res){
        try{
            let code = 1;
            Admin.findOne({_id:req.auth.user_id, code:req.auth.user_code, email:req.auth.user_email, statut:req.auth.statut})
            .then(admin=>{
                if(!admin) return res.status(400).json({msg: `Veuillez vous authentifier pour avoir accès aux données demandées`})
                req.body.villeA = req.body.ville;
                req.body.villeB = req.body.ville;
                Ligne.findOne({villeA: req.body.villeA, statut:1})
                .then(ligneA=>{
                    if(!ligneA){
                        Ligne.findOne({villeB: req.body.villeB, statut:1})
                        .then(ligneB=>{
                            if(!ligneB) return res.status(400).json({msg: "Cette ligne n'existe pas encore. Veuillez si possible changer de ligne."})
                            res.status(200).json({msg:`Réquette traitée avec succès`, data: ligneB})
                        })
                        .catch(errer=> res.status(500).json({msg: `Une erreur est survenue lors du traitement. Veuillez donc réessayer dans quelques instant.`}))
                    }else  res.status(200).json({msg: `Réquette traitée avec succès.`, data: ligneA})
                }).catch(error=>{
                    console.log(error.message, error);
                    res.status(400).json({msg: `Veuillez rensiegner une url correct`, error: error})
                })
                
            })
            .catch(error=>{
                res.status(400).json({msg: `Veuillez rensiegner une url correct`, error: error})
            })
        }catch(error){
            res.status(500).json({msg})
        }
    }

    static async getByMontant(req, res){
        try{
            let code = 1;
            Admin.findOne({_id:req.auth.user_id, code:req.auth.user_code, email:req.auth.user_email, statut:req.auth.statut})
            .then(admin=>{
                if(!admin) return res.status(400).json({msg: `Veuillez vous authentifier pour avoir accès aux données demandées`})
                Ligne.findOne({montant: req.body.montant, statut:1})
                .then(ligne=>{
                    res.status(200).json({msg: `Un élément est retrouvé`, data: ligne})
                }).catch(error=>{
                    console.log(error.message, error);
                    res.status(400).json({msg: `Veuillez rensiegner une url correct`, error: error})
                })
            })
            .catch(error=>{
                res.status(400).json({msg: `Veuillez rensiegner une url correct`, error: error})
            })
        }catch(error){
            res.status(500).json({msg})
        }
    }

    static async getByDistance(req, res){
        try{
            let code = 1;
            Admin.findOne({_id:req.auth.user_id, code:req.auth.user_code, email:req.auth.user_email, statut:req.auth.statut})
            .then(admin=>{
                if(!admin) return res.status(400).json({msg: `Veuillez vous authentifier pour avoir accès aux données demandées`})
                Ligne.findOne({distance: req.body.distance, statut:1})
                .then(ligne=>{
                    res.status(200).json({msg: `Un élément est retrouvé`, data: ligne})
                }).catch(error=>{
                    console.log(error.message, error);
                    res.status(400).json({msg: `Veuillez rensiegner une url correct`, error: error})
                })
            })
            .catch(error=>{
                res.status(400).json({msg: `Veuillez rensiegner une url correct`, error: error})
            })
        }catch(error){
            res.status(500).json({msg})
        }
    }


    static async updateLigne(req,res){
        try {
            Admin.findOne({_id:req.auth.user_id, code:req.auth.user_code, email:req.auth.user_email, statut:req.auth.statut})

            .then(admin=>{
                if(!admin) return res.json({msg: "Veuillez-vous authentifier !"});
                Ligne.findOne({_id:req.body.id, statut:1})
                .then((ligne)=>{
                    if(ligne){
                        if(req.file){req.body.photo=req.file.path;}
                        Ligne.updateOne({_id: req.body.id, statut:1},{...req.body})
                        .then((newLigne)=>{
                            if(newLigne.modifiedCount === 0) return res.status(400).json({msg: "Aucune modifiction n'a été faite !"});
                            Ligne.findOne({_id: req.body.id, statut:1})
                            .then(ln=>{
                                res.status(200).json({msg: "Modification effectué avec succès", Data: ln});
                            }) 
                        })
                        .catch((error)=> {
                            console.log(error);
                            res.status(404).json({msg: error.message});
                        })
                    }
                    else{
                        console.log(`Aucune modification n'a été effectuée cas les données à supprimer n'existent pas.`);
                        res.status(401).json({msg: `Aucune modification n'a été effectuée cas les données à supprimer n'existent pas.`});
                    }
                })
                .catch(error=> {
                    console.log(error);
                    res.status(404).json({msg: error.message});
                })
            })
        } catch (error) {
            console.log(error)
            res.status(400).json({msg})
        }
    }

    static async deleteLigne(req,res){
        try {
            Admin.findOne({_id:req.auth.user_id, code:req.auth.user_code, email:req.auth.user_email, statut:req.auth.statut})
            .then(admin=>{
                if(!admin) return res.json({msg: "Veuillez-vous authentifier !"});
                Ligne.findOne({_id:req.body.id, statut:1})
                .then((data)=>{
                    if(data){
                        Ligne.updateOne({_id: req.body.id, statut: 1}, {statut:0})
                        .then(()=>{
                            res.status(201).json({msg: "Suppression effectué avec succès !!"});
                        })
                        .catch((error)=> {
                            console.log(error);
                            res.status(404).json({msg:"Suppression non effectué !",error: error.message});
                        })
                    }
                    else{
                        console.log(`Aucune suppression n'a été effectuée cas les données à supprimer n'existent pas.`);
                        res.status(401).json({msg: `Aucune suppression n'a été effectuée cas les données à supprimer n'existent pas.`});
                    }
                })
                .catch(error=> {
                    console.log(error);
                    res.status(404).json({msg: error.message});
                })
            })
        } catch (error) {
            console.log(error);
            res.status(400).json({msg});
        }
    }
}
module.exports = LigneController;