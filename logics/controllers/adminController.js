const Admin = require(`../models/adminModel`);
const bcrypt = require(`bcrypt`)
class AdminController{
    static async create(req, res){
        try {
            let code = 1;
            Admin.find({}).then((all)=>{if(all.length > 0) code = all.length+1;});
            Admin.findOne({email: req.body.email})
            .then(fin=>{
                if(fin) return res.status(400).json({msg: `Ce admininstrateur est déjà ajouté.`});
                bcrypt.hash(req.body.password, 10)
                .then((hash)=>{
                    if(req.file){req.body.photo=req.file.path}
                    let admin = new Admin({code: `ADMIN${code}`, ... req.body, password: hash, createdAt:new Date(), updatedAt:new Date()});
                    admin.save()
                    .then((add)=>{
                        console.log(add);
                        res.status(200).json({msg:`Inscription effectuée avec succès !`, admin: add})
                    })
                    .catch((error)=>{
                        console.log(error.message);
                        res.status(401).json({msg:error.message})
                    })
                })
                .catch((error)=>{
                    console.log('Au niveau de l\'hashage',error)
                    res.status(401).json({msg:error.message});
                });
            })
            .catch((error)=>{
                console.log("'Au niveau des données'",error)
                res.status(401).json({msg:error.message})
            });
        }catch (error) {console.log(error); res.status(500).json({msg: error.message})}
    }



    

    static async allAdmin(req, res){
        try{
            Admin.findOne({_id:req.auth.user_id, code:req.auth.user_code, email:req.auth.user_email, statut:req.auth.statut})
            .then(admin=>{
                if(admin){
                    Admin.find({statut:1})
                    .then(allAdmin=> {
                        const message = `Il y'a ${allAdmin.length} élémnents disponible(s).`;
                        res.status(200).json({msg: message, data: allAdmin});
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
                    Admin.findById(req.params.id.split('-')[0])
                    .then(user=>{
                        if(!user || user.statut === 0){
                            const message = `La administrateur dont l'identifiant est ${req.body.id} n'existe pas`;
                            res.status(200).json({msg: message});
                        }else{
                            const message = `Un élément est trouvé.`;
                            res.status(200).json({msg:message, data: user});
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
                res.status(500).json({msg: error.message});
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
                    Admin.findOne({code:req.body.code, statut:1})
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
                    Admin.find({statut:1})
                    .then(user=>{
                        if(!user || user.statut === 0){
                            const message = `La administrateur dont l'identifiant est ${req.body.raisonSociale} n'existe pas`;
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
            Admin.findOne({_id:req.auth.user_id, code:req.auth.user_code, email:req.auth.user_email, statut:req.auth.statut})
            .then(admin=>{
                if(admin){
                    Admin.find({email:req.body.email})
                    .then(user=>{
                        if(!user || user.statut === 0){
                            const message = `La administrateur d'adresse email ${req.body.email} n'existe pas`;
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
            Admin.findOne({_id:req.auth.user_id, code:req.auth.user_code, email:req.auth.user_email, statut:req.auth.statut})
            .then(admin=>{
                if(admin){
                    Admin.find({telephone:req.body.telephone})
                    .then(user=>{
                        if(!user || user.statut === 0){
                            const message = `La administrateur d'adresse téléphonique ${req.body.telephone} n'existe pas.`;
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
            Admin.findOne({_id:req.auth.user_id, code:req.auth.user_code, email:req.auth.user_email, statut:req.auth.statut})
            .then(admin=>{
                if(admin){
                    Admin.find({role:req.body.role})
                    .then(user=>{
                        if(!user || user.statut === 0){
                            const message = `L'administrateur dont le rôle est ${req.body.role} n'existe pas.`;
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

    static async updateAdmin(req,res){
        try {
            console.log(req.body);
            Admin.findOne({_id:req.auth.user_id, code:req.auth.user_code, email:req.auth.user_email, statut:req.auth.statut})
            .then(admin=>{
                if(!admin) return res.json({msg: "Veuillez-vous authentifier !"});
                Admin.findOne({_id:req.body.id, statut:1})
                .then((user)=>{
                    if(user){
                        if(req.file){req.body.photo=req.file.path;}
                        Admin.updateOne({_id: req.body.id, statut:1},{...req.body, updatedAt:new Date()})
                        .then((newUser)=>{
                            if(newUser.modifiedCount === 0){console.log("Aucune modifiction n'a été faite !"); return res.status(401).json({msg: "Aucune modifiction n'a été faite !"})};
                            Admin.findOne({_id: req.body.id, statut:1})
                            .then(updated=>{
                                console.log("Modification effectué avec succès !");
                                res.status(201).json({msg: "Modification effectué avec succès", admin: updated});
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



    static async updatedAdmin(req, res){
        try {
            Admin.findOne({email: req.body.email, statut: 1})
            .then((user)=>{
                if(!user){
                    res.status(400).json({msg: "Email incorrect !"});
                }else{
                    bcrypt.compare(req.body.ancienPassword, user.password)
                    .then(pass=>{
                        if(!pass) return res.status(201).json({msg:"L'ancien mot de passe est incorrect !!"});
                        bcrypt.hash(req.body.password, 10)
                        .then(hash=>{
                            Admin.updateOne({email:req.body.email, statut:1}, {password:hash, updatedAt:new Date()})
                            .then(response=>{
                                console.log(1, response);
                                return res.status(200).json({msg:'Mot de passe modifié avec succès', admin: response});
                            })
                            .catch(error=>{
                                console.log(2)
                                return res.status(404).json({msg:"Modification érronnéé", error: error});
                            })
                        })
                        .catch(error=>{
                            console.log(3)
                            return res.status(404).json({msg:'Modification érronnée', error:error})
                        })
                    })
                    .catch((error)=>{
                        console.log(4)
                        return res.status(404).json({msg:'Modification érronnée', error:error})
                    })
                }
            })
            .catch(error=>{
                console.log(5)
                return res.status(500).json({msg:`Ce compte n'existe pas. Cherchez à vous inscrire !`, error:error})
            })
        } catch (error) {
            console.log(6)
            return res.status(500).json({msg: 'Modification érronnée, réessayer plus tard.',})
        }
    }














    static async deleteAdmin(req,res){
        try {
            Admin.findOne({_id:req.auth.user_id, code:req.auth.user_code, email:req.auth.user_email, statut:req.auth.statut})
            .then(admin=>{
                if(!admin) return res.json({msg: "Veuillez-vous authentifier !"});
                Admin.findOne({_id:req.body.id, statut:1})
                .then((data)=>{
                    if(data){
                        Admin.updateOne({_id: req.body.id, statut: 1},{statut:0, updatedAt:new Date()})
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
                    res.status(404).json({msg: error.message});
                })
            })
        } catch (error) {
            console.log(error);
            res.status(400).json({msg});
        }
    }
}
module.exports = AdminController;