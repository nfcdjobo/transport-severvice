const Compagny = require('../models/compagnyModel');
const Machiniste = require('../models/machinisteModel');
const Admin = require('../models/adminModel')
const bcrypt = require(`bcrypt`);

class MachinisteController{
    static async create(req, res){
        try {
            let code = 1;
            Machiniste.find({}).then((all)=>{
                if(all.length > 0) code = all.length+1;
            });
            Machiniste.findOne({email: req.body.email})
            .then(fin=>{
                if(fin) return res.status(400).json({msg: `Ce machiniste est déjà ajouté.`})
                const chiffre=`+1234567890`;
                if(req.body.telephone.length >= 10 && req.body.telephone.split('').every(item=>chiffre.includes(item))){
                    bcrypt.hash(req.body.password, 10)
                    .then((hash)=>{
                        if(req.file){req.body.photo=req.file.path;}
                        let machiniste = new Machiniste({code: `MACHINISTE${code}`, ... req.body, password: hash, createdAt:new Date(), updatedAt:new Date()});
                        machiniste.save()
                        .then((add)=>{console.log(add); res.status(201).json({msg:`Inscription effectuée avec succès !`, admin: add})})
                        .catch((error)=>{console.log(error); res.status(401).json({error:error.message})})
                    })
                    .catch((error)=>res.status(401).json({error:error.message}))
                }else res.status(400).json({msg: `L'adresse téléphonique n'est pas valide !`});
            })
        }catch (error) {console.log(error); res.status(500).json({msg: error.message})}
    }

    static async allMachiniste(req, res){
        try{
            Admin.findOne({_id:req.auth.user_id, code:req.auth.user_code, email:req.auth.user_email, statut:req.auth.statut})
            .then(admin=>{
                if(admin){
                    Machiniste.find({statut:1})
                    .then(allMachiniste=> {
                        const message = `Il y'a ${allMachiniste.length} élémnents disponible(s).`;
                        res.status(200).json({msg: message, data: allMachiniste});
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
                    Machiniste.findById(req.params.id)
                    .then(machiniste=>{
                        if(!machiniste || machiniste.statut === 0){
                            const message = `Ce machiniste dont l'identifiant est ${req.params.id} n'existe pas`;
                            res.status(200).json({msg: message});
                        }else{
                            const message = `Un élément est trouvé.`;
                            res.status(200).json({msg:message, data: machiniste});
                        }
                    })
                    .catch((error)=>{
                        const message = `Rien n'est trouvé. Utilisez la bonne référence !`;
                        res.status(200).json({msg:message, data: error.message});
                    })
                }else{
                    res.status(500).json({msg: "Veuillez d'abord vous authentifier !"});
                    return
                }
            })
            .catch((error)=>{
                res.status(500);json({error: error.message});
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
                    Machiniste.findOne({code:req.body.code, statut:1})
                    .then(user=>{
                        if(!user || user.statut === 0){
                            const message = `La administrateur dont mle code est ${req.body.code} n'existe pas`;
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
                res.status(500);json({error: error.message});
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
                    Machiniste.find({})
                    .then(machiniste=>{
                        if(!machiniste || machiniste.statut === 0){
                            const message = `La administrateur dont l'identifiant est ${req.body.raisonSociale} n'existe pas`;
                            res.status(200).json({msg: message});
                        }else{
                            machiniste = machiniste.filter(item=>item.nomPrenom.toLowerCase().includes(req.body.nomPrenom.toLowerCase()))
                            const message = `Il y a ${machiniste.length} occurrence sous le terme ${req.body.nomPrenom}.`;
                            res.status(200).json({msg: message, data: machiniste});
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
                res.status(500);json({error: error.message});
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
                    Machiniste.find({email:req.body.email})
                    .then(machiniste=>{
                        if(!machiniste || machiniste.statut === 0){
                            const message = `La administrateur d'adresse email ${req.body.email} n'existe pas`;
                            res.status(200).json({msg: message});
                        }else{
                            const message = `Un élément est trouvé.`;
                            res.status(200).json({msg: message,data: machiniste[0]});
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
                res.status(500);json({error: error.message});
            })
        }catch(error){
            const message = `URL non valable`;
            res.status(500).json({msg: message, data: error.message});
        }
    }

    static async getByTelephone(req, res){ // On trouve en fonction de la cle primière du catégorie
        try{
            Admin.findOne({_id:req.auth.user_id, code:req.auth.user_code, email:req.auth.user_email, statut:req.auth.statut})
            .then(admin=>{
                if(admin){
                    Machiniste.find({telephone:req.body.telephone})
                    .then(machiniste=>{
                        if(!machiniste || machiniste.statut === 0){
                            const message = `La administrateur d'adresse téléphonique ${req.body.telephone} n'existe pas.`;
                            res.status(200).json({msg: message});
                        }else{
                            const message = `Un élément est trouvé.`;
                            res.status(200).json({msg: message,data: machiniste});
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
                res.status(500);json({error: error.message});
            })
        }catch(error){
            const message = `URL non valable`;
            res.status(500).json({msg: message, data: error.message});
        }
    }


    static async getByRole(req, res){ // On trouve en fonction de la cle primière du catégorie
        try{
            Admin.findOne({_id:req.auth.user_id, code:req.auth.user_code, email:req.auth.user_email, statut:req.auth.statut})
            .then(admin=>{
                if(admin){
                    Machiniste.find({role:req.body.role})
                    .then(machiniste=>{
                        if(!machiniste || machiniste.statut === 0){
                            const message = `L'administrateur dont le rôle est ${req.body.role} n'existe pas.`;
                            res.status(200).json({msg: message});
                        }else{
                            const message = `${machiniste.length} occurance(s) a/ont été trouvées.`;
                            res.status(200).json({msg:message, data: machiniste});
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
                res.status(500);json({error: error.message});
            })
        }catch(error){
            const message = `URL non valable`;
            res.status(500).json({msg: message, data: error.message});
        }
    }

    static async updateMachiniste(req,res){
        try {
            Admin.findOne({_id:req.auth.user_id, code:req.auth.user_code, email:req.auth.user_email, statut:req.auth.statut})
            .then(admin=>{
                if(!admin) return res.json({msg: "Veuillez-vous authentifier !"});
                Machiniste.findOne({_id:req.body.id})
                .then((machiniste)=>{
                    if(machiniste){
                        if(req.file){req.body.photo=req.file.path;}
                        Machiniste.updateOne({_id: req.body.id, statut:1},{...req.body,  updatedAt:new Date()})
                        .then((newMachiniste)=>{
                            if(newMachiniste.modifiedCount === 0) return res.status(401).json({msg: "Aucune modifiction n'a été faite !"});
                            Machiniste.findOne({code: req.body.code, statut:1})
                            .then(updated=>{
                                res.status(201).json({msg: "Modification effectué avec succès", admin: updated});
                            }) 
                        })
                        .catch((error)=> {
                            console.log(error);
                            res.status(404).json({error: error.message});
                        })
                    }else{
                        console.log(`Aucune modification n'a été effectuée cas les données à modifier n'existent pas.`);
                        res.status(401).json({msg: `Aucune modification n'a été effectuée cas les données à modifier n'existent pas.`});
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

    static async updateMachiniste2(req,res){
        try {
            Machiniste.findOne({_id:req.auth.user_id, code:req.auth.user_code, email:req.auth.user_email, statut:req.auth.statut})
            .then(passag=>{
                if(!passag) return res.json({msg: "Veuillez-vous authentifier !"});
                Machiniste.findOne({_id:req.body.id})
                .then((machiniste)=>{
                    if(machiniste){
                        if(req.file){req.body.photo=req.file.path;}
                        Machiniste.updateOne({_id: req.body.id, statut:1},{...req.body,  updatedAt:new Date()})
                        .then((newMachiniste)=>{
                            if(newMachiniste.modifiedCount === 0) return res.status(401).json({msg: "Aucune modifiction n'a été faite !"});
                            Machiniste.findOne({code: req.body.code, statut:1})
                            .then(updated=>{
                                res.status(201).json({msg: "Modification effectué avec succès", admin: updated});
                            }) 
                        })
                        .catch((error)=> {
                            console.log(error);
                            res.status(404).json({error: error.message});
                        })
                    }else{
                        console.log(`Aucune modification n'a été effectuée cas les données à modifier n'existent pas.`);
                        res.status(401).json({msg: `Aucune modification n'a été effectuée cas les données à modifier n'existent pas.`});
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


    static async updatedMachiniste(req, res){
        try {
            Machiniste.findOne({email: req.body.email, statut: 1})
            .then((user)=>{
                if(!user){
                    res.status(400).json({msg: "Email incorrect !"});
                }else{
                    bcrypt.compare(req.body.ancienPassword, user.password)
                    .then(pass=>{
                        if(!pass) return res.status(201).json({msg:"L'ancien mot de passe est incorrect !!"});
                        bcrypt.hash(req.body.password, 10)
                        .then(hash=>{
                            Machiniste.updateOne({email:req.body.email, statut:1}, {password:hash, updatedAt:new Date()})
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






    static async deleteMachiniste(req,res){
        try {
            Admin.findOne({_id:req.auth.user_id, code:req.auth.user_code, email:req.auth.user_email, statut:req.auth.statut})
            .then(admin=>{
                if(!admin) return res.json({msg: "Veuillez-vous authentifier !"});
                Machiniste.findOne({_id:req.body.id, statut:1})
                .then((machiniste)=>{
                    if(machiniste){
                        Machiniste.updateOne({_id: req.body.id, statut: 1},{statut:0,   updatedAt:new Date()})
                        .then(()=>{
                            console.log("Suppression effectué avec succès !")
                            res.status(201).json({msg: "Suppression effectué avec succès !"});
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
                    res.status(404).json({error: error.message});
                })
            })
        } catch (error) {
            console.log(error);
            res.status(400).json({error});
        }
    }
}
module.exports = MachinisteController;