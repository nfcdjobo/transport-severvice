
const Admin = require('../models/adminModel');
const Role = require('../models/roleModel');
class RoleController{
    static async create(req, res){ // On trouve en fonction de la cle primière du catégorie
        try{
            let code = 1;
            Admin.findOne({_id:req.auth.user_id, code:req.auth.user_code, email:req.auth.user_email, statut:req.auth.statut})
            .then(admin=>{
                if(admin){
                    Role.find({})
                    .then(all=>{
                        if(all.length > 0) {code=all.length+1;}
                        Role.findOne({libelle:req.body.libelle, statut:1})
                        .then(role=>{
                            if(role) return res.status(400).json({msg:`Ce rôle est déjà ajouté.`})
                            let newRole = new Role({... req.body, compagny_id: admin.compagny_id, admin_id: admin._id, code:`ROLE${code}`});
                            newRole.save()
                            .then((add)=>{
                                console.log(add); 
                                return res.status(200).json({msg:"Rôle ajoutée avec succès !", data: add})
                            })
                            .catch((error)=>{
                                console.log(error);
                                return res.status(401).json({error:error.message})
                            })
                        })
                    })
                    .catch(error=>{
                        console.log(`Une erreur est survenue lors du traitement de la réquette. Veuillez donc réessayer dans quelques instants`);
                        res.status(400).json({msg: `Une erreur est survenue lors du traitement de la réquette. Veuillez donc réessayer dans quelques instants`, error: error})
                    }) 
                }else{
                    return res.status(500).json({msg: "Veuillez d'abord vous authentifier !"});
                }
            })
            .catch((error)=>{
                res.status(500).json({error: error.message});
            })
        }catch(error){
            const message = `URL non valable`;
            console.log(error.message)
            res.status(500).json({msg: message, data: error.message});
        }
    }

    static async allRole(req, res){
        try{
            Admin.findOne({_id:req.auth.user_id, code:req.auth.user_code, email:req.auth.user_email, statut:req.auth.statut})
            .then(admin=>{
                if(!admin) return res.status(400).json({msg: `Veuillez vous authentifier pour avoir accès aux données demandées`})
                Role.find({statut:1}).then(role=>{
                    res.status(200).json({msg: `Il y a ${role.length} élément(s) trouvé(s)`, data: role})
                }).catch(error=>{
                    console.log(error.message, error);
                    res.status(400).json({msg: `Veuillez rensiegner une url correct`, error: error})
                })
                
            })
            .catch(error=>{
                res.status(400).json({msg: `Veuillez rensiegner une url correct`, error: error})
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
                if(!admin) return res.status(400).json({msg: `Veuillez vous authentifier pour avoir accès aux données demandées`})
                Role.findOne({_id: req.params.id, statut:1})
                .then(role=>{
                    res.status(200).json({msg: `Un élément est retrouvé`, data: role})
                }).catch(error=>{
                    console.log(error.message, error);
                    res.status(400).json({msg: `Veuillez rensiegner une url correct`, error: error})
                })
                
            })
            .catch(error=>{
                res.status(400).json({msg: `Veuillez rensiegner une url correct`, error: error})
            })
        }catch(error){
            res.status(500).json({error})
        }
    }

    static async getByCode(req, res){
        try{
            Admin.findOne({_id:req.auth.user_id, code:req.auth.user_code, email:req.auth.user_email, statut:req.auth.statut})
            .then(admin=>{
                if(!admin) return res.status(400).json({msg: `Veuillez vous authentifier pour avoir accès aux données demandées`})
                Role.findOne({code: req.params.code, statut:1})
                .then(role=>{
                    res.status(200).json({msg: `Un élément est retrouvé`, data: role})
                }).catch(error=>{
                    console.log(error.message, error);
                    res.status(400).json({msg: `Veuillez rensiegner une url correct`, error: error})
                })
                
            })
            .catch(error=>{
                res.status(400).json({msg: `Veuillez rensiegner une url correct`, error: error})
            })
        }catch(error){
            res.status(500).json({error})
        }
    }

    static async getByLibelle(req, res){
        try{
            Admin.findOne({_id:req.auth.user_id, code:req.auth.user_code, email:req.auth.user_email, statut:req.auth.statut})
            .then(admin=>{
                if(!admin) return res.status(400).json({msg: `Veuillez vous authentifier pour avoir accès aux données demandées`})
                Role.findOne({libelle: req.params.libelle, statut:1})
                .then(role=>{
                    res.status(200).json({msg: `Un élément est retrouvé`, data: role})
                }).catch(error=>{
                    console.log(error.message, error);
                    res.status(400).json({msg: `Veuillez rensiegner une url correct`, error: error})
                })
            })
            .catch(error=>{
                res.status(400).json({msg: `Veuillez rensiegner une url correct`, error: error})
            })
        }catch(error){
            res.status(500).json({error})
        }
    }


    static async updateRole(req,res){
        try {
            Admin.findOne({_id:req.auth.user_id, code:req.auth.user_code, email:req.auth.user_email, statut:req.auth.statut})
            .then(admin=>{
                if(!admin) return res.json({msg: "Veuillez-vous authentifier !"});
                Role.findOne({_id:req.body.id, statut:1})
                .then((role)=>{
                    if(role){
                        if(req.file){req.body.photo=req.file.path;}
                        Role.updateOne({_id: req.body.id, statut:1},{...req.body})
                        .then((newRole)=>{
                            if(newRole.modifiedCount === 0) return res.status(401).json({msg: "Aucune modifiction n'a été faite !"});
                            Role.findOne({_id: req.body._id, status:1})
                            .then(updated=>{
                                res.status(201).json({msg: "Modification effectué avec succès", Role: updated});
                            }) 
                        })
                        .catch((error)=> {
                            console.log(error);
                            res.status(404).json({msg: error.message});
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
            console.log(error)
            res.status(400).json({msg})
        }
    }

    static async deleteRole(req,res){
        try {
            Admin.findOne({_id:req.auth.user_id, code:req.auth.user_code, email:req.auth.user_email, statut:req.auth.statut})
            .then(admin=>{
                if(!admin) return res.json({msg: "Veuillez-vous authentifier !"});
                Role.findOne({_id:req.body.id, statut:1})
                .then((data)=>{
                    if(data){
                        Role.updateOne({_id: req.body.id},{statut:0})
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
            res.status(400).json({msg:`Une erreur est survenue lors du traitememnt de la réquétte. Veuillez donc réessayer plus tart !`, error: error});
        }
    }
}
module.exports = RoleController;