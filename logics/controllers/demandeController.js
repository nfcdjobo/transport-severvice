const Demande =require('../models/demandeModel');
const Admin =require('../models/adminModel')
class DemandeController{
    static async create(req, res){
        let code = 1;
        try {
            console.log('++++++++++++++++++++++++++++++++++++++',req.body)
            Demande.find({})
            .then((all)=>{
                if(all.length > 0) {code = all.length+1;}
                let demande = new Demande({... req.body, code: `DEMAN${code}`, createdAt:new Date(), updatedAt: new Date()});
                demande.save()
                .then((add)=>{console.log(add); res.status(200).json({msg:"Inscription effectuée avec succès !", demande: add})})
                .catch((error)=>{console.log(error); res.status(401).json({msg:error.message})});
            });
        }catch (error) {console.log(error); res.status(500).json({msg: error.message})}
    }

    static async allCompagny(req, res){
        try{
            Admin.findOne({_id:req.auth.user_id, code:req.auth.user_code, email:req.auth.user_email, statut:req.auth.statut})
            .then(admin=>{
                if(admin){
                    Demande.find({statut:1})
                    .then(demande=> {
                        const message = `Il y'a ${demande.length} élémnents disponible(s).`;
                        res.status(200).json({msg: message, data: demande});
                    })
                    .catch((error)=>{
                        const message = "Aucun élément trouvé";
                        res.status(400).json({msg: message, data: error.message});
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
            res.status(500).json({data: error.message});
        }
    }

    static async getById(req, res){ // On trouve en fonction de la cle primière du catégorie
        try{
            Admin.findOne({_id:req.auth.user_id, code:req.auth.user_code, email:req.auth.user_email, statut:req.auth.statut})
            .then(admin=>{
                if(admin){
                    Demande.findById(req.params.id)
                    .then(demande=>{
                        if(!demande || demande.statut === 0){
                            const message = `La demande dont l'identifiant est ${req.body.id} n'existe pas`;
                            res.status(200).json({msg: message});
                        }else{
                            const message = `Un élément est trouvé.`;
                            res.status(200).json({msg: message,data: demande});
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

    static async getByEmail(req, res){ // On trouve en fonction de la cle primière du catégorie
        try{
            Admin.findOne({_id:req.auth.user_id, code:req.auth.user_code, email:req.auth.user_email, statut:req.auth.statut})
            .then(admin=>{
                if(admin){
                    Demande.findOne({email:req.params.email, statut:1})
                    .then(demande=>{
                        if(!demande || demande.statut === 0){
                            const message = `La compagnie dont mle code est ${req.body.code} n'existe pas`;
                            res.status(200).json({msg: message});
                        }else{
                            const message = `Un élément est trouvé.`;
                            res.status(200).json({msg: message, data: demande});
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
                    Demande.find({nomPrenom:req.params.nomPrenom})
                    .then(demande=>{
                        if(!demande || demande.statut === 0){
                            const message = `La compagnie dont l'identifiant est ${req.params.nomPrenom} n'existe pas`;
                            res.status(200).json({msg: message});
                        }else{
                            const message = `Un élément est trouvé.`;
                            res.status(200).json({msg: message,data: demande});
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

    static async updateDemande(req,res){
        try {
            Admin.findOne({_id:req.auth.user_id, code:req.auth.user_code, email:req.auth.user_email, statut:req.auth.statut})
            .then(admin=>{
                if(!admin) return res.json({msg: "Veuillez-vous authentifier !"});
                Demande.findOne({_id:req.body.id, statut:1})
                .then((demande)=>{
                    if(demande){
                        Demande.updateOne({_id:req.body.id, statut:1},{...req.body})
                        .then((newDemande)=>{
                            if(newDemande.modifiedCount === 0) return res.status(401).json({msg: "Aucune modifiction n'a été faite !"});
                            Demande.findOne({raisonSociale: req.body.raisonSociale, status:1})
                            .then(updated=>{
                                res.status(201).json({msg: "Modification effectué avec succès", demande: updated});
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

    static async deleteDemande(req,res){
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
module.exports = DemandeController;