const Admin = require(`../models/adminModel`);
const Compagny = require(`../models/compagnyModel`);
const Passager = require(`../models/PassagerModel`);
const bcrypt = require(`bcrypt`)
class BagageController{
    static async create(req, res){
        try {
            let code = 1;
            Passager.find({}).then((all)=>{
                if(all.length > 0) code = all.length+1;
            });
            Passager.findOne({email: req.body.email}).then(fin=>{
                if(fin) return res.status(400).json({message: `Ce admininstrateur est déjà ajouté.`})
                if(req.body.telephone.length >= 13 && req.body.telephone.includes('+')){
                    bcrypt.hash(req.body.password, 10)
                    .then((hash)=>{
                        let admin = new Passager({code: `${req.body.compagny_id}-BAGAGE${code}`, ... req.body, user_id: req.body.user_id, password: hash});
                        admin.save()
                        .then((add)=>{console.log(add); res.status(201).json({msg:`Inscription effectuée avec succès !`, admin: add})})
                        .catch((error)=>{console.log(error); res.status(401).json({error:error.message})})
                    })
                    .catch((error)=>res.status(401).json({error:error.message}))
                }else
                    res.status.json({msg: `L'adresse téléphonique n'est pas valide !`});
            })
        }catch (error) {console.log(error); res.status(500).json({message: error.message})}
    }

    static async allAdmin(req, res){
        try{
            Admin.findOne({_id:req.auth.user_id, code:req.auth.user_code, email:req.auth.user_email, statut:req.auth.statut})
            .then(admin=>{
                console.log('admin',admin)
                if(admin){
                    Admin.find({statut:1})
                    .then(allAdmin=> {
                        const message = `Il y'a ${allAdmin.length} élémnents disponible(s).`;
                        res.status(200).json({message: message, data: allAdmin});
                    })
                    .catch((error)=>{
                        const message = "Aucun élément trouvé";
                        res.status(400).json({message: message, data: error.message});
                    })
                }else{
                    res.status(500).json({message: "Veuillez d'abord vous authentifier !"});
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
                    Admin.findById(req.body.id)
                    .then(user=>{
                        if(!user || user.statut === 0){
                            const message = `La administrateur dont l'identifiant est ${req.body.id} n'existe pas`;
                            res.status(200).json({message: message});
                        }else{
                            const message = `Un élément est trouvé.`;
                            res.status(200).json({message:message, data: user});
                        }
                    })
                    .catch((error)=>{
                        const message = `Rien n'est trouvé. Utilisez la bonne référence !`;
                        res.status(200).json({message:message, data: error.message});
                    })
                }else{
                    res.status(500).json({message: "Veuillez d'abord vous authentifier !"});
                    return
                }
            })
            .catch((error)=>{
                res.status(500);json({error: error.message});
            })
        }catch(error){
            const message = `URL non valable`;
            res.status(500).json({message: message, data: error.message});
        }
    }

    static async getByCode(req, res){ // On trouve en fonction de la cle primière du catégorie
        try{
            Admin.findOne({_id:req.auth.user_id, code:req.auth.user_code, email:req.auth.user_email, statut:req.auth.statut})
            .then(admin=>{
                if(admin){
                    Admin.findOne({code:req.body.code, statut:1})
                    .then(user=>{
                        if(!user || user.statut === 0){
                            const message = `La administrateur dont mle code est ${req.body.code} n'existe pas`;
                            res.status(200).json({message: message});
                        }else{
                            const message = `Un élément est trouvé.`;
                            res.status(200).json({message: message,data: user});
                        }
                    })
                    .catch((error)=>{
                        const message = `Rien n'est trouvé. Utilisez la bonne référence !`;
                        res.status(200).json({message: message, data: error.message});
                    })
                }else{
                    res.status(500).json({message: "Veuillez d'abord vous authentifier !"});
                    return
                }
            })
            .catch((error)=>{
                res.status(500);json({error: error.message});
            })
        }catch(error){
            const message = `URL non valable`;
            res.status(500).json({message: message, data: error.message});
        }
    }

    static async getByName(req, res){ // On trouve en fonction de la cle primière du catégorie
        try{
            Admin.findOne({_id:req.auth.user_id, code:req.auth.user_code, email:req.auth.user_email, statut:req.auth.statut})
            .then(admin=>{
                if(admin){
                    Admin.find({statut:1})
                    .then(user=>{
                        if(!user || user.statut === 0){
                            const message = `La administrateur dont l'identifiant est ${req.body.raisonSociale} n'existe pas`;
                            res.status(200).json({message: message});
                        }else{
                            user = user.filter(item=>item.nomPrenom.includes(req.body.nomPrenom.toUpperCase()) || item.nomPrenom.includes(req.body.nomPrenom.toLowerCase()))
                            const message = `Il y a ${user.length} occurrence sous le terme ${req.body.nomPrenom}.`;
                            res.status(200).json({message: message, data: user});
                        }
                    })
                    .catch((error)=>{
                        const message = `Rien n'est trouvé. Utilisez la bonne référence !`;
                        res.status(200).json({message: message, data: error.message});
                    })
                }else{
                    res.status(500).json({message: "Veuillez d'abord vous authentifier !"});
                    return
                }
            })
            .catch((error)=>{
                res.status(500);json({error: error.message});
            })
        }catch(error){
            const message = `URL non valable`;
            res.status(500).json({message: message, data: error.message});
        }
    }

    static async getByEmail(req, res){ // On trouve en fonction de la cle primière du catégorie
        try{
            Admin.findOne({_id:req.auth.user_id, code:req.auth.user_code, email:req.auth.user_email, statut:req.auth.statut})
            .then(admin=>{
                if(admin){
                    Admin.find({email:req.body.email})
                    .then(user=>{
                        if(!user || user.statut === 0){
                            const message = `La administrateur d'adresse email ${req.body.email} n'existe pas`;
                            res.status(200).json({message: message});
                        }else{
                            const message = `Un élément est trouvé.`;
                            res.status(200).json({message: message,data: user[0]});
                        }
                    })
                    .catch((error)=>{
                        const message = `Rien n'est trouvé. Utilisez la bonne référence !`;
                        res.status(200).json({message: message, data: error.message});
                    })
                }else{
                    res.status(500).json({message: "Veuillez d'abord vous authentifier !"});
                    return
                }
            })
            .catch((error)=>{
                res.status(500);json({error: error.message});
            })
        }catch(error){
            const message = `URL non valable`;
            res.status(500).json({message: message, data: error.message});
        }
    }

    static async getByTelephone(req, res){ // On trouve en fonction de la cle primière du catégorie
        try{
            Admin.findOne({_id:req.auth.user_id, code:req.auth.user_code, email:req.auth.user_email, statut:req.auth.statut})
            .then(admin=>{
                if(admin){
                    Admin.find({telephone:req.body.telephone})
                    .then(user=>{
                        if(!user || user.statut === 0){
                            const message = `La administrateur d'adresse téléphonique ${req.body.telephone} n'existe pas.`;
                            res.status(200).json({message: message});
                        }else{
                            const message = `Un élément est trouvé.`;
                            res.status(200).json({message: message,data: user[0]});
                        }
                    })
                    .catch((error)=>{
                        const message = `Rien n'est trouvé. Utilisez la bonne référence !`;
                        res.status(200).json({message: message, data: error.message});
                    })
                }else{
                    res.status(500).json({message: "Veuillez d'abord vous authentifier !"});
                    return
                }
            })
            .catch((error)=>{
                res.status(500);json({error: error.message});
            })
        }catch(error){
            const message = `URL non valable`;
            res.status(500).json({message: message, data: error.message});
        }
    }


    static async getByRole(req, res){ // On trouve en fonction de la cle primière du catégorie
        try{
            Admin.findOne({_id:req.auth.user_id, code:req.auth.user_code, email:req.auth.user_email, statut:req.auth.statut})
            .then(admin=>{
                if(admin){
                    Admin.find({role:req.body.role})
                    .then(user=>{
                        if(!user || user.statut === 0){
                            const message = `L'administrateur dont le rôle est ${req.body.role} n'existe pas.`;
                            res.status(200).json({message: message});
                        }else{
                            const message = `${user.length} occurance(s) a/ont été trouvées.`;
                            res.status(200).json({message:message, data: user});
                        }
                    })
                    .catch((error)=>{
                        const message = `Rien n'est trouvé. Utilisez la bonne référence !`;
                        res.status(200).json({message: message, data: error.message});
                    })
                }else{
                    res.status(500).json({message: "Veuillez d'abord vous authentifier !"});
                    return
                }
            })
            .catch((error)=>{
                res.status(500);json({error: error.message});
            })
        }catch(error){
            const message = `URL non valable`;
            res.status(500).json({message: message, data: error.message});
        }
    }

    static async updateAdmin(req,res){
        try {
            Admin.findOne({_id:req.auth.user_id, code:req.auth.user_code, email:req.auth.user_email, statut:req.auth.statut})
            .then(admin=>{
                if(!admin) return res.json({message: "Veuillez-vous authentifier !"});
                Admin.findOne({code:req.body.code, statut:1})
                .then((user)=>{
                    if(user){
                        Admin.updateOne({code: req.body.code, statut:1},{...req.body})
                        .then((newUser)=>{
                            if(newUser.modifiedCount === 0) return res.status(401).json({message: "Aucune modifiction n'a été faite !"});
                            Admin.findOne({code: req.body.code, statut:1})
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

    static async deleteAdmin(req,res){
        try {
            Admin.findOne({_id:req.auth.user_id, code:req.auth.user_code, email:req.auth.user_email, statut:req.auth.statut})
            .then(admin=>{
                if(!admin) return res.json({message: "Veuillez-vous authentifier !"});
                Admin.findOne({code:req.body.code, statut:1})
                .then((data)=>{
                    if(data){
                        Admin.updateOne({code: req.body.code, statut: 1},{statut:0})
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
module.exports = BagageController;