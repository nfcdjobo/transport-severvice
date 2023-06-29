const Passager = require(`../models/passagerModel`);
// const Passager = require(`../models/passagerModel`);
const bcrypt = require(`bcrypt`);
const Admin = require("../models/adminModel");
class PassagerController{
    static async create(req, res){
        try {
            let code = 1;
            Passager.find({}).then((all)=>{
                if(all.length > 0) code = all.length+1;
            });
            Passager.findOne({email: req.body.email}).then(fin=>{
                if(fin) return res.status(400).json({msg: `Ce passager est déjà ajouté.`});
                bcrypt.hash(req.body.password, 10)
                .then((hash)=>{
                    if(req.file){req.body.photo=req.file.path;}
                    let passager = new Passager({code: `PASSAGER${code}`, ... req.body, password: hash, createdAt:new Date(), updatedAt:new Date()});
                    passager.save()
                    .then((add)=>{console.log(add); res.status(200).json({msg:`Inscription effectuée avec succès !`, passager: add})})
                    .catch((error)=>{console.log(error); res.status(400).json({msg:error.message})})
                })
                .catch((error)=>res.status(400).json({msg:error.message}))
            })
        }catch (error) {console.log(error); res.status(500).json({msg: error.message})}
    }

    static async allPassager(req, res){
        try{
            Admin.findOne({_id:req.auth.user_id, code:req.auth.user_code, email:req.auth.user_email, statut:req.auth.statut})
            .then(passager=>{
                console.log('passager',passager)
                if(passager){
                    Passager.find({statut:1})
                    .then(allpassager=> {
                        const message = `Il y'a ${allpassager.length} élémnents disponible(s).`;
                        res.status(200).json({msg: message, data: allpassager});
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
        }catch(error){
            res.status(500).json({data: error.message});
        }
    }

    static async getById(req, res){ // On trouve en fonction de la cle primière du catégorie
        try{
            Admin.findOne({_id:req.auth.user_id, code:req.auth.user_code, email:req.auth.user_email, statut:req.auth.statut})
            .then(admin=>{
                if(admin){
                    Passager.findById({_id:req.params.id, statut:1})
                    .then(passager=>{
                        if(passager){
                            const message = `Un élément est trouvé.`;
                            res.status(200).json({msg:message, data: passager});
                        }
                        
                    })
                    .catch((error)=>{
                        const message = `Rien n'est trouvé. Utilisez la bonne référence !`;
                        res.status(400).json({msg:message, data: error.message});
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
            Passager.findOne({_id:req.auth.user_id, code:req.auth.user_code, email:req.auth.user_email, statut:req.auth.statut})
            .then(passager=>{
                if(passager){
                    Passager.findOne({code:req.body.code, statut:1})
                    .then(user=>{
                        if(!user || user.statut === 0){
                            const message = `La passageristrateur dont mle code est ${req.body.code} n'existe pas`;
                            res.status(200).json({msg: message});
                        }else{
                            const message = `Un élément est trouvé.`;
                            res.status(200).json({msg: message,data: user});
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
            Passager.findOne({_id:req.auth.user_id, code:req.auth.user_code, email:req.auth.user_email, statut:req.auth.statut})
            .then(passager=>{
                if(passager){
                    Passager.find({statut:1})
                    .then(user=>{
                        if(!user || user.statut === 0){
                            const message = `La passageristrateur dont l'identifiant est ${req.body.raisonSociale} n'existe pas`;
                            res.status(200).json({msg: message});
                        }else{
                            user = user.filter(item=>item.nomPrenom.includes(req.body.nomPrenom.toUpperCase()) || item.nomPrenom.includes(req.body.nomPrenom.toLowerCase()))
                            const message = `Il y a ${user.length} occurrence sous le terme ${req.body.nomPrenom}.`;
                            res.status(200).json({msg: message, data: user});
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
            Passager.findOne({_id:req.auth.user_id, code:req.auth.user_code, email:req.auth.user_email, statut:req.auth.statut})
            .then(passager=>{
                if(passager){
                    Passager.find({email:req.body.email})
                    .then(user=>{
                        if(!user || user.statut === 0){
                            const message = `La passageristrateur d'adresse email ${req.body.email} n'existe pas`;
                            res.status(200).json({msg: message});
                        }else{
                            const message = `Un élément est trouvé.`;
                            res.status(200).json({msg: message,data: user[0]});
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

    static async getByTelephone(req, res){ // On trouve en fonction de la cle primière du catégorie
        try{
            Passager.findOne({_id:req.auth.user_id, code:req.auth.user_code, email:req.auth.user_email, statut:req.auth.statut})
            .then(passager=>{
                if(passager){
                    Passager.find({telephone:req.body.telephone})
                    .then(user=>{
                        if(!user || user.statut === 0){
                            const message = `La passageristrateur d'adresse téléphonique ${req.body.telephone} n'existe pas.`;
                            res.status(200).json({msg: message});
                        }else{
                            const message = `Un élément est trouvé.`;
                            res.status(200).json({msg: message,data: user[0]});
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


    static async getByRole(req, res){ // On trouve en fonction de la cle primière du catégorie
        try{
            Passager.findOne({_id:req.auth.user_id, code:req.auth.user_code, email:req.auth.user_email, statut:req.auth.statut})
            .then(passager=>{
                if(passager){
                    Passager.find({role:req.body.role})
                    .then(user=>{
                        if(!user || user.statut === 0){
                            const message = `L'passageristrateur dont le rôle est ${req.body.role} n'existe pas.`;
                            res.status(200).json({msg: message});
                        }else{
                            const message = `${user.length} occurance(s) a/ont été trouvées.`;
                            res.status(200).json({msg:message, data: user});
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

    static async updatePassager(req,res){
        try {
            console.log(req.body);
            console.log('.....................................', req.auth)
            Admin.findOne({_id:req.auth.user_id, code:req.auth.user_code, email:req.auth.user_email, statut:req.auth.statut})
            .then(passager=>{
                if(!passager) return res.json({msg: "Veuillez-vous authentifier !"});
                Passager.findOne({_id:req.body.id, statut:1})
                .then((passager)=>{
                    if(passager){
                        if(req.file){req.body.photo=req.file.path;}
                        Passager.updateOne({_id: req.body.id, statut:1},{...req.body, updatedAt:new Date()})
                        .then((newPassager)=>{
                            if(newPassager.modifiedCount === 0) return res.status(400).json({msg: "Aucune modifiction n'a été faite !"});
                            Passager.findOne({_id: req.body.id, statut:1})
                            .then(updated=>{
                                res.status(200).json({msg: "Modification effectué avec succès", data: updated});
                            }) 
                        })
                        .catch((error)=> {
                            console.log(error);
                            res.status(404).json({msg: error.message});
                        })
                    }
                    else{
                        console.log(`Aucune modification n'a été effectuée cas les données à supprimer n'existent pas.`);
                        res.status(401).json({msg: `Aucune modification n'a été effectuée cas les données à modifier n'existent pas.`});
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


    static async updatePassager2(req,res){
        try {
            Passager.findOne({_id:req.auth.user_id, code:req.auth.user_code, email:req.auth.user_email, statut:req.auth.statut})
            .then(passager=>{
                if(!passager) return res.json({msg: "Veuillez-vous authentifier !"});
                Passager.findOne({_id:req.body.id, statut:1})
                .then((passager)=>{
                    if(passager){
                        if(req.file){req.body.photo=req.file.path;}
                        Passager.updateOne({_id: req.body.id, statut:1},{...req.body, updatedAt:new Date()})
                        .then((newPassager)=>{
                            if(newPassager.modifiedCount === 0) return res.status(400).json({msg: "Aucune modifiction n'a été faite !"});
                            Passager.findOne({_id: req.body.id, statut:1})
                            .then(updated=>{
                                res.status(200).json({msg: "Modification effectué avec succès", data: updated});
                            }) 
                        })
                        .catch((error)=> {
                            console.log(error);
                            res.status(404).json({msg: error.message});
                        })
                    }
                    else{
                        console.log(`Aucune modification n'a été effectuée cas les données à supprimer n'existent pas.`);
                        res.status(401).json({msg: `Aucune modification n'a été effectuée cas les données à modifier n'existent pas.`});
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


    static async updatedPassager(req, res){
        try {
            Passager.findOne({email: req.body.email, statut: 1})
            .then((user)=>{
                if(!user){
                    res.status(400).json({msg: "Email incorrect !"});
                }else{
                    bcrypt.compare(req.body.ancienPassword, user.password)
                    .then(pass=>{
                        if(!pass) return res.status(201).json({msg:"L'ancien mot de passe est incorrect !!"});
                        bcrypt.hash(req.body.password, 10)
                        .then(hash=>{
                            Passager.updateOne({email:req.body.email, statut:1}, {password:hash, updatedAt:new Date()})
                            .then(response=>{
                                res.status(200).json({msg:'Mot de passe modifié avec succès', admin: response});
                            })
                            .catch(error=>{
                                res.status(404).json({msg:"Modification érronnéé", error: error});
                            })
                        })
                        .catch(error=>{
                            res.status(404).json({msg:'Modification érronnée', error:error})
                        })
                        
                    })
                    .catch((error)=>{
                        res.status(404).json({msg:'Modification érronnée', error:error})
                    })
                }
            })
            .catch(error=>{
                res.status(500).json({msg:`Ce compte n'existe pas. Cherchez à vous inscrire !`, error:error})
            })
        } catch (error) {
            res.status(500).json({msg: error.message})
        }
    }












    static async deletePassager(req,res){
        try {
            Admin.findOne({_id:req.auth.user_id, code:req.auth.user_code, email:req.auth.user_email, statut:req.auth.statut})
            .then(passager=>{
                if(!passager) return res.json({msg: "Veuillez-vous authentifier !"});
                Passager.findOne({_id:req.body.id, statut:1})
                .then((data)=>{
                    if(data){
                        Passager.updateOne({_id: req.body.id, statut:1},{statut:0, updatedAt:new Date()})
                        .then((response)=>{
                            console.log(response)
                            res.status(200).json({msg: "Suppression effectué avec succès !!"});
                        })
                        .catch((error)=> {
                            console.log(error);
                            res.status(400).json({msg:"Suppression non effectué !", error: error.message});
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
module.exports = PassagerController;