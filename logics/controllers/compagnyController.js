const Compagny = require('../models/compagnyModel');
const Admin = require('../models/adminModel');
class CompagnyController{
    static async create(req, res){
        let code = 1;
        try {
            Admin.findOne({_id:req.auth.user_id, code:req.auth.user_code, email:req.auth.user_email, statut:req.auth.statut})
            .then(admin=>{
                if(!admin) return res.json({msg: "Veuillez-vous authentifier !"});
                Compagny.findOne({raisonSociale: req.body.raisonSociale}).then(item=>{
                    if(item) {console.log("Cette compagnie existe déjà:  raison sociale déjà utilisée");return res.status(400).json({msg: "Cette compagnie existe déjà: raison sociale déjà utilisée."})}
                    else{
                        Compagny.findOne({email: req.body.email}).then(key=>{
                            if(key) {console.log("Cette compagnie existe déjà:  adresse email déjà utilisé");return res.status(400).json({msg: "Cette compagnie existe déjà: adresse email déjà utilisé"})}
                            else{
                                Compagny.find({}).then((all)=>{
                                    if(all.length > 0) {code = all.length+1;}
                                    if(req.file){req.body.photo=req.file.path}
                                    let compagny = new Compagny({... req.body, code: `COMPGI${code}`, createdAt:new Date(), updatedAt: new Date()});
                                    compagny.save()
                                    .then((add)=>{console.log(add); res.status(200).json({msg:"Inscription effectuée avec succès !", compagny: add})})
                                    .catch((error)=>{console.log(error); res.status(401).json({msg:error.message})});
                                });
                            }
                        });
                    }
                });
            });
        }catch (error) {console.log(error); res.status(500).json({msg: error.message})}
    }

    static async allCompagny(req, res){
        try{
            Compagny.find({statut:1})
            .then(compagny=> {
                const message = `Il y'a ${compagny.length} élémnents disponible(s).`;
                res.status(200).json({msg: message, data: compagny});
            })
            .catch((error)=>{
                const message = "Aucun élément trouvé";
                res.status(400).json({msg: message, data: error.message});
            })
        }catch(error){
            res.status(500).json({data: error.message});
        }
    }

    static async getById(req, res){ // On trouve en fonction de la cle primière du catégorie
        try{
            Admin.findOne({_id:req.auth.user_id, code:req.auth.user_code, email:req.auth.user_email, statut:req.auth.statut})
            .then(admin=>{
                if(admin){
                    Compagny.findById(req.params.id)
                    .then(compagny=>{
                        if(!compagny || compagny.statut === 0){
                            const message = `La compagnie dont l'identifiant est ${req.body.id} n'existe pas`;
                            res.status(200).json({msg: message});
                        }else{
                            const message = `Un élément est trouvé.`;
                            res.status(200).json({msg: message,data: compagny});
                        }
                    })
                    .catch((error)=>{
                        const message = `Rien n'est trouvé. Utilisez la bonne référence !`;
                        res.status(200).json({msg: message, data: error.message});
                    })
                }else{
                    res.status(500).json({msg: "Veuillez d'abord vous authentifier !"});
                    return
                }
            })
            .catch((error)=>{
                res.status(500);json({msg: error.message});
            })
        }catch(error){
            const message = `URL non valable`;
            res.status(500).json({msg: message, data: error.message});
        }
    }

    static async getByCode(req, res){ // On trouve en fonction de la cle primière du catégorie
        try{
            Admin.findOne({_id:req.auth.user_id, code:req.auth.user_code, email:req.auth.user_email, statut:req.auth.statut})
            .then(admin=>{
                if(admin){
                    Compagny.findOne({code:req.params.code, statut:1})
                    .then(compagny=>{
                        if(!compagny || compagny.statut === 0){
                            const message = `La compagnie dont mle code est ${req.body.code} n'existe pas`;
                            res.status(200).json({msg: message});
                        }else{
                            const message = `Un élément est trouvé.`;
                            res.status(200).json({msg: message,data: compagny});
                        }
                    })
                    .catch((error)=>{
                        const message = `Rien n'est trouvé. Utilisez la bonne référence !`;
                        res.status(200).json({msg: message, data: error.message});
                    })
                }else{
                    res.status(500).json({msg: "Veuillez d'abord vous authentifier !"});
                    return
                }
            })
            .catch((error)=>{
                res.status(500);json({msg: error.message});
            })
        }catch(error){
            const message = `URL non valable`;
            res.status(500).json({msg: message, data: error.message});
        }
    }

    static async getByName(req, res){ // On trouve en fonction de la cle primière du catégorie
        try{
            Admin.findOne({_id:req.auth.user_id, code:req.auth.user_code, email:req.auth.user_email, statut:req.auth.statut})
            .then(admin=>{
                if(admin){
                    Compagny.find({raisonSociale:req.params.raisonSociale})
                    .then(compagny=>{
                        if(!compagny || compagny.statut === 0){
                            const message = `La compagnie dont l'identifiant est ${req.body.raisonSociale} n'existe pas`;
                            res.status(200).json({msg: message});
                        }else{
                            const message = `Un élément est trouvé.`;
                            res.status(200).json({msg: message,data: compagny[0]});
                        }
                    })
                    .catch((error)=>{
                        const message = `Rien n'est trouvé. Utilisez la bonne référence !`;
                        res.status(200).json({msg: message, data: error.message});
                    })
                }else{
                    res.status(500).json({msg: "Veuillez d'abord vous authentifier !"});
                    return
                }
            })
            .catch((error)=>{
                res.status(500);json({msg: error.message});
            })
        }catch(error){
            const message = `URL non valable`;
            res.status(500).json({msg: message, data: error.message});
        }
    }

    static async getByEmail1(req, res){ // On trouve en fonction de la cle primière du catégorie
        try{
            Admin.findOne({_id:req.auth.user_id, code:req.auth.user_code, email:req.auth.user_email, statut:req.auth.statut})
            .then(admin=>{
                if(admin){
                    Compagny.find({email1:req.params.email1})
                    .then(compagny=>{
                        if(!compagny || compagny.statut === 0){
                            const message = `La compagnie d'adresse email ${req.body.email1} n'existe pas`;
                            res.status(200).json({msg: message});
                        }else{
                            const message = `Un élément est trouvé.`;
                            res.status(200).json({msg: message,data: compagny[0]});
                        }
                    })
                    .catch((error)=>{
                        const message = `Rien n'est trouvé. Utilisez la bonne référence !`;
                        res.status(200).json({msg: message, data: error.message});
                    })
                }else{
                    res.status(500).json({msg: "Veuillez d'abord vous authentifier !"});
                    return
                }
            })
            .catch((error)=>{
                res.status(500);json({msg: error.message});
            })
        }catch(error){
            const message = `URL non valable`;
            res.status(500).json({msg: message, data: error.message});
        }
    }

    static async getByEmail2(req, res){ // On trouve en fonction de la cle primière du catégorie
        try{
            Admin.findOne({_id:req.auth.user_id, code:req.auth.user_code, email:req.auth.user_email, statut:req.auth.statut})
            .then(admin=>{
                if(admin){
                    Compagny.find({email2:req.params.email2})
                    .then(compagny=>{
                        if(!compagny || compagny.statut === 0){
                            const message = `La compagnie d'adresse email ${req.body.email2} n'existe pas`;
                            res.status(200).json({msg: message});
                        }else{
                            const message = `Un élément est trouvé.`;
                            res.status(200).json({msg: message,data: compagny[0]});
                        }
                    })
                    .catch((error)=>{
                        const message = `Rien n'est trouvé. Utilisez la bonne référence !`;
                        res.status(200).json({msg: message, data: error.message});
                    })
                }else{
                    res.status(500).json({msg: "Veuillez d'abord vous authentifier !"});
                    return
                }
            })
            .catch((error)=>{
                res.status(500);json({msg: error.message});
            })
        }catch(error){
            const message = `URL non valable`;
            res.status(500).json({msg: message, data: error.message});
        }
    }

    static async updateCompagny(req,res){
        try {
            Admin.findOne({_id:req.auth.user_id, code:req.auth.user_code, email:req.auth.user_email, statut:req.auth.statut})
            .then(admin=>{
                if(!admin) return res.json({msg: "Veuillez-vous authentifier !"});
                Compagny.findOne({_id:req.body.id, statut:1})
                .then((compagny)=>{
                    if(compagny){
                        if(req.file){req.body.photo=req.file.path}
                        Compagny.updateOne({_id:req.body.id, statut:1},{...req.body})
                        .then((newCompag)=>{
                            if(newCompag.modifiedCount === 0) return res.status(401).json({msg: "Aucune modifiction n'a été faite !"});
                            Compagny.findOne({raisonSociale: req.body.raisonSociale, status:1})
                            .then(updated=>{
                                res.status(201).json({msg: "Modification effectué avec succès", compagny: updated});
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

    static async deleteCompagny(req,res){
        try {
            Admin.findOne({_id:req.auth.user_id, code:req.auth.user_code, email:req.auth.user_email, statut:req.auth.statut})
            .then(admin=>{
                if(!admin) return res.json({msg: "Veuillez-vous authentifier !"});
                Compagny.findOne({_id:req.body.id, statut:1})
                .then((data)=>{
                    if(data){
                        Compagny.updateOne({_id: req.body.id},{statut:0})
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
module.exports = CompagnyController;