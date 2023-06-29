const Ligne = require('../models/ligneModel');
const Admin = require('../models/adminModel');
const Car = require('../models/carModel');
const Voyage = require('../models/voyageModel');
class VayageController{
    static async create(req, res){ // On trouve en fonction de la cle primière du catégorie
        try{
            let code = 1;
            Admin.findOne({_id:req.auth.user_id, code:req.auth.user_code, email:req.auth.user_email, statut:req.auth.statut})
            .then(admin=>{
                if(admin){
                    Voyage.find({})
                    .then(all=>{
                        if(all.length > 0) {code = all.length+1;}
                        Ligne.findById(req.body.ligne_id)
                        .then(ligne=>{
                            if(ligne.statut === 0) return res.status(400).json({message: `Cette ligne n'existe plus`});
                            if(ligne.montant === 0) return res.status(401).json({message: `Le prix du transport de la ligne ${ligne.villeA} <=> ${ligne.villeB} n'est pas définit`});
                            Car.findOne({_id: req.body.car_id, statut:1})
                            .then(car=>{
                                if(!car) return res.status(400).json({message: `Ce vehicule n'existe plus`});
                                req.body.revenu = ligne.montant*(car.place-2);
                                req.body.nombrePassage = car.place-2;
                                req.body.depart = new Date(req.body.depart);
                                let newVoyage = new Voyage({... req.body, compagny_id: admin.compagny_id, admin_id: admin._id, ligne_id: req.body.ligne_id, code: `VOYAGE${code}`});
                                newVoyage.save()
                                .then((add)=>{
                                    console.log(add); 
                                    return res.status(200).json({message:"voyage ajoutée avec succès !", voyage: add})
                                })
                                .catch((error)=>{
                                    console.log(error);
                                    return res.status(401).json({error:error.message})
                                });
                            })
                        })
                    })
                    .catch(error=>{
                        console.log(`Une erreur est survenue lors du traitement de la réquette. Veuillez donc réessayer dans quelques instants`);
                        res.status(400).json({message: `Une erreur est survenue lors du traitement de la réquette. Veuillez donc réessayer dans quelques instants`, error: error})
                    }) 
                }else{
                    return res.status(500).json({message: "Veuillez d'abord vous authentifier !"});
                }
            })
            .catch((error)=>{
                res.status(500).json({error: error.message});
            })
        }catch(error){
            const message = `URL non valable`;
            console.log(error.message)
            res.status(500).json({message: message, data: error.message});
        }
    }

    static async allVoyage(req, res){
        try{
            Admin.findOne({_id:req.auth.user_id, code:req.auth.user_code, email:req.auth.user_email, statut:req.auth.statut})
            .then(admin=>{
                if(!admin) return res.status(400).json({message: `Veuillez vous authentifier pour avoir accès aux données demandées`})
                Voyage.find({statut:1}).then(voyage=>{
                    res.status(200).json({message: `Il y a ${voyage.length} élément(s) trouvé(s)`, data: voyage})
                }).catch(error=>{
                    console.log(error.message, error);
                    res.status(400).json({message: `Veuillez rensiegner une url correct`, error: error})
                })
                
            })
            .catch(error=>{
                res.status(400).json({message: `Veuillez rensiegner une url correct`, error: error})
            })
        }catch(error){
            res.status(500).json({error})
        }
    }

    static async getById(req, res){
        try{
            let code = 1;
            Admin.findOne({_id:req.auth.user_id, code:req.auth.user_code, email:req.auth.user_email, statut:req.auth.statut})
            .then(admin=>{
                if(!admin) return res.status(400).json({message: `Veuillez vous authentifier pour avoir accès aux données demandées`})
                Voyage.findOne({_id: req.body.id, statut:1})
                .then(voyage=>{
                    res.status(200).json({message: `Un élément est retrouvé`, data: voyage})
                }).catch(error=>{
                    console.log(error.message, error);
                    res.status(400).json({message: `Veuillez rensiegner une url correct`, error: error})
                })
                
            })
            .catch(error=>{
                res.status(400).json({message: `Veuillez rensiegner une url correct`, error: error})
            })
        }catch(error){
            res.status(500).json({error})
        }
    }

    static async getByCode(req, res){
        try{
            let code = 1;
            Admin.findOne({_id:req.auth.user_id, code:req.auth.user_code, email:req.auth.user_email, statut:req.auth.statut})
            .then(admin=>{
                if(!admin) return res.status(400).json({message: `Veuillez vous authentifier pour avoir accès aux données demandées`})
                Voyage.findOne({code: req.body.code, statut:1})
                .then(voyage=>{
                    res.status(200).json({message: `Un élément est retrouvé`, data: voyage})
                }).catch(error=>{
                    console.log(error.message, error);
                    res.status(400).json({message: `Veuillez rensiegner une url correct`, error: error})
                })
                
            })
            .catch(error=>{
                res.status(400).json({message: `Veuillez rensiegner une url correct`, error: error})
            })
        }catch(error){
            res.status(500).json({error})
        }
    }

    static async getByNombrePassager(req, res){
        try{
            let code = 1;
            Admin.findOne({_id:req.auth.user_id, code:req.auth.user_code, email:req.auth.user_email, statut:req.auth.statut})
            .then(admin=>{
                if(!admin) return res.status(400).json({message: `Veuillez vous authentifier pour avoir accès aux données demandées`})
                Voyage.find({nombrePassage: req.body.nombrePassage, statut:1})
                .then(voyage=>{
                    if(voyage.length === 0) return res.status(401).json({message: `Cette marque n'est pas encore disponible.`})
                    res.status(200).json({message: `Réquette traitée avec succès.`, data: voyage})
                }).catch(error=>{
                    console.log(error.message, error);
                    res.status(400).json({message: `Veuillez rensiegner une url correct`, error: error})
                })
                
            })
            .catch(error=>{
                res.status(400).json({message: `Veuillez rensiegner une url correct`, error: error})
            })
        }catch(error){
            res.status(500).json({error})
        }
    }

    static async getByRevenu(req, res){
        try{
            let code = 1;
            Admin.findOne({_id:req.auth.user_id, code:req.auth.user_code, email:req.auth.user_email, statut:req.auth.statut})
            .then(admin=>{
                if(!admin) return res.status(400).json({message: `Veuillez vous authentifier pour avoir accès aux données demandées`})
                Voyage.find({revenu: req.body.revenu, statut:1})
                .then(voyage=>{
                    if(voyage.length === 0) return res.status(400).json({message: `Aucun vehicule n'a ${req.body.place} places.`})
                    res.status(200).json({message: `Il y a ${voyage.length} vehicule(s)`, data: voyage})
                }).catch(error=>{
                    console.log(error.message, error);
                    res.status(400).json({message: `Veuillez rensiegner une url correct`, error: error})
                })
            })
            .catch(error=>{
                res.status(400).json({message: `Veuillez rensiegner une url correct`, error: error})
            })
        }catch(error){
            res.status(500).json({error})
        }
    }

    static async getByDepart(req, res){
        try{
            let code = 1;
            Admin.findOne({_id:req.auth.user_id, code:req.auth.user_code, email:req.auth.user_email, statut:req.auth.statut})
            .then(admin=>{
                if(!admin) return res.status(400).json({message: `Veuillez vous authentifier pour avoir accès aux données demandées`})
                Voyage.find({depart: req.body.depart, statut:1})
                .then(voyage=>{
                    if(voyage.length === 0) return res.status(400).json({message: "Aucun vehicule n'est climatisé"})
                    res.status(200).json({message: `Il y a ${voyage.length} voyage(s).`, data: voyage})
                }).catch(error=>{
                    console.log(error.message, error);
                    res.status(400).json({message: `Veuillez rensiegner une url correct`, error: error})
                })
            })
            .catch(error=>{
                res.status(400).json({message: `Veuillez rensiegner une url correct`, error: error})
            })
        }catch(error){
            res.status(500).json({error})
        }
    }

    static async getByLigne(req, res){
        try{
            let code = 1;
            Admin.findOne({_id:req.auth.user_id, code:req.auth.user_code, email:req.auth.user_email, statut:req.auth.statut})
            .then(admin=>{
                if(!admin) return res.status(400).json({message: `Veuillez vous authentifier pour avoir accès aux données demandées`})
                Voyage.find({ligne_id: req.body.ligne_id, statut:1})
                .then(voyage=>{
                    if(voyage.length === 0) return res.status(400).json({message: "Aucun vehicule n'est climatisé"})
                    res.status(200).json({message: `Il y a ${voyage.length} voyage(s).`, data: voyage})
                }).catch(error=>{
                    console.log(error.message, error);
                    res.status(400).json({message: `Veuillez rensiegner une url correct`, error: error})
                })
            })
            .catch(error=>{
                res.status(400).json({message: `Veuillez rensiegner une url correct`, error: error})
            })
        }catch(error){
            res.status(500).json({error})
        }
    }

    static async getByMachiniste(req, res){
        try{
            let code = 1;
            Admin.findOne({_id:req.auth.user_id, code:req.auth.user_code, email:req.auth.user_email, statut:req.auth.statut})
            .then(admin=>{
                if(!admin) return res.status(400).json({message: `Veuillez vous authentifier pour avoir accès aux données demandées`})
                Voyage.find({machiniste_id: req.body.machiniste_id, statut:1})
                .then(voyage=>{
                    if(voyage.length === 0) return res.status(400).json({message: "Aucun vehicule n'est climatisé"})
                    res.status(200).json({message: `Il y a ${voyage.length} voyage(s).`, data: voyage})
                }).catch(error=>{
                    console.log(error.message, error);
                    res.status(400).json({message: `Veuillez rensiegner une url correct`, error: error})
                })
            })
            .catch(error=>{
                res.status(400).json({message: `Veuillez rensiegner une url correct`, error: error})
            })
        }catch(error){
            res.status(500).json({error})
        }
    }

    static async getByCar(req, res){
        try{
            let code = 1;
            Admin.findOne({_id:req.auth.user_id, code:req.auth.user_code, email:req.auth.user_email, statut:req.auth.statut})
            .then(admin=>{
                if(!admin) return res.status(400).json({message: `Veuillez vous authentifier pour avoir accès aux données demandées`})
                Voyage.find({car_id: req.body.car_id, statut:1})
                .then(voyage=>{
                    if(voyage.length === 0) return res.status(400).json({message: "Aucun vehicule n'est climatisé"})
                    res.status(200).json({message: `Il y a ${voyage.length} voyage(s).`, data: voyage})
                }).catch(error=>{
                    console.log(error.message, error);
                    res.status(400).json({message: `Veuillez rensiegner une url correct`, error: error})
                })
            })
            .catch(error=>{
                res.status(400).json({message: `Veuillez rensiegner une url correct`, error: error})
            })
        }catch(error){
            res.status(500).json({error})
        }
    }

    static async getByAdmin(req, res){
        try{
            let code = 1;
            Admin.findOne({_id:req.auth.user_id, code:req.auth.user_code, email:req.auth.user_email, statut:req.auth.statut})
            .then(admin=>{
                if(!admin) return res.status(400).json({message: `Veuillez vous authentifier pour avoir accès aux données demandées`})
                Voyage.find({admin_id: req.body.admin_id, statut:1})
                .then(voyage=>{
                    if(voyage.length === 0) return res.status(400).json({message: "Aucun vehicule n'est climatisé"})
                    res.status(200).json({message: `Il y a ${voyage.length} voyage(s).`, data: voyage})
                }).catch(error=>{
                    console.log(error.message, error);
                    res.status(400).json({message: `Veuillez rensiegner une url correct`, error: error})
                })
            })
            .catch(error=>{
                res.status(400).json({message: `Veuillez rensiegner une url correct`, error: error})
            })
        }catch(error){
            res.status(500).json({error})
        }
    }


    static async updateVoyage(req,res){
        try {
            Admin.findOne({_id:req.auth.user_id, code:req.auth.user_code, email:req.auth.user_email, statut:req.auth.statut})
            .then(admin=>{
                if(!admin) return res.json({message: "Veuillez-vous authentifier !"});
                Voyage.findOne({code:req.body.code, statut:1})
                .then((voyage)=>{
                    if(voyage){
                        Voyage.updateOne({code: req.body.code, statut:1},{...req.body})
                        .then((newVoyage)=>{
                            if(newVoyage.modifiedCount === 0) return res.status(401).json({message: "Aucune modifiction n'a été faite !"});
                            Voyage.findOne({code: req.body.code, statut:1})
                            .then(updated=>{
                                res.status(201).json({message: "Modification effectué avec succès", admin: updated});
                            }) 
                        })
                        .catch((error)=> {
                            console.log(error);
                            res.status(404).json({error: error.message});
                        })
                    }
                    else{
                        console.log(`Aucune suppression n'a été effectuée cas les données à supprimer n'existent pas.`);
                        res.status(401).json({message: `Aucune suppression n'a été effectuée cas les données à supprimer n'existent pas.`});
                    }
                })
                .catch(error=> {
                    console.log(error);
                    res.status(404).json({error: error.message});
                })
            })
        } catch (error) {
            console.log(error)
            res.status(400).json({error})
        }
    }

    static async deleteVoyage(req,res){
        try {
            Admin.findOne({_id:req.auth.user_id, code:req.auth.user_code, email:req.auth.user_email, statut:req.auth.statut})
            .then(admin=>{
                if(!admin) return res.json({message: "Veuillez-vous authentifier !"});
                Voyage.findOne({code:req.body.code, statut:1})
                .then((data)=>{
                    if(data){
                        Voyage.updateOne({code: req.body.code, statut: 1},{statut:0})
                        .then(()=>{
                            res.status(201).json({message: "Suppression effectué avec succès !!"});
                        })
                        .catch((error)=> {
                            console.log(error);
                            res.status(404).json({message:"Suppression non effectué !",error: error.message});
                        })
                    }
                    else{
                        console.log(`Aucune suppression n'a été effectuée cas les données à supprimer n'existent pas.`);
                        res.status(401).json({message: `Aucune suppression n'a été effectuée cas les données à supprimer n'existent pas.`});
                    }
                })
                .catch(error=> {
                    console.log(error);
                    res.status(404).json({error: error.message});
                })
            })
        } catch (error) {
            console.log(error);
            res.status(400).json({error});
        }
    }
}
module.exports = VayageController;