// const Compagny = require('../models/compagnyModel');
const Ligne = require('../models/ligneModel');
const Admin = require('../models/adminModel');
const Car = require('../models/carModel')
class CarController{
    static async create(req, res){ // On trouve en fonction de la cle primière du catégorie
        try{
            let code = 1;
            Admin.findOne({_id:req.auth.user_id, code:req.auth.user_code, email:req.auth.user_email, statut:req.auth.statut})
            .then(admin=>{
                if(admin){
                    Car.find({})
                    .then((all)=>{
                        if(all.length > 0) {code = all.length+1;}
                        if(req.body.climatisation=="1") req.body.climatisation=true;
                        if(req.body.climatisation=="0") req.body.climatisation=false;
                        if(req.file){req.body.photo=req.file.path;}
                        let newCar = new Car({... req.body, place:Number(req.body.place), code: `CAR${code}`, createdAt:new Date(), updatedAt:new Date()});
                        newCar.save()
                        .then((add)=>{console.log(add); res.status(200).json({msg:"car ajoutée avec succès !", car: add})})
                        .catch((error)=>{console.log(error); res.status(401).json({msg:error.message})});
                    })
                    .catch(error=>{
                        console.log(error.message, error);
                        res.status(500).json({msg: "Une erreur est survenue lorsque de l'enregistrement, veuillez donc réessayer dans quelques instants", error: error})
                    })
                }
            })
            .catch((error)=>{
                res.status(500).json({msg: error.message});
            })
        }catch(error){
            const message = `URL non valable`;
            console.log(error);
            res.status(500).json({msg: message, data: error.message});
        }
    }

    static async allCar(req, res){
        try{
            let code = 1;
            Admin.findOne({_id:req.auth.user_id, code:req.auth.user_code, email:req.auth.user_email, statut:req.auth.statut})
            .then(admin=>{
                if(!admin) return res.status(400).json({msg: `Veuillez vous authentifier pour avoir accès aux données demandées`})
                Car.find({statut:1}).then(car=>{
                    res.status(200).json({msg: `Il y a ${car.length} élément(s) trouvé(s)`, data: car})
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

    static async getById(req, res){
        try{
            let code = 1;
            Admin.findOne({_id:req.auth.user_id, code:req.auth.user_code, email:req.auth.user_email, statut:req.auth.statut})
            .then(admin=>{
                if(!admin) return res.status(400).json({msg: `Veuillez vous authentifier pour avoir accès aux données demandées`})
                Car.findOne({_id: req.params.id, statut:1})
                .then(car=>{
                    res.status(200).json({msg: `Un élément est retrouvé`, data: car})
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
                Car.findOne({code: req.body.code, statut:1})
                .then(car=>{
                    res.status(200).json({msg: `Un élément est retrouvé`, data: car})
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

    static async getByMarque(req, res){
        try{
            let code = 1;
            Admin.findOne({_id:req.auth.user_id, code:req.auth.user_code, email:req.auth.user_email, statut:req.auth.statut})
            .then(admin=>{
                if(!admin) return res.status(400).json({msg: `Veuillez vous authentifier pour avoir accès aux données demandées`})
                Car.find({marque: req.body.marque, statut:1})
                .then(car=>{
                    if(car.length === 0) return res.status(401).json({msg: `Cette marque n'est pas encore disponible.`})
                    res.status(200).json({msg: `Réquette traitée avec succès.`, data: car})
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

    static async getByPlace(req, res){
        try{
            let code = 1;
            Admin.findOne({_id:req.auth.user_id, code:req.auth.user_code, email:req.auth.user_email, statut:req.auth.statut})
            .then(admin=>{
                if(!admin) return res.status(400).json({msg: `Veuillez vous authentifier pour avoir accès aux données demandées`})
                Car.find({place: req.body.place, statut:1})
                .then(car=>{
                    if(car.length === 0) return res.status(400).json({msg: `Aucun vehicule n'a ${req.body.place} places.`})
                    res.status(200).json({msg: `Il y a ${car.length} vehicule(s)`, data: car})
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

    static async getByClimatisation(req, res){
        try{
            let code = 1;
            Admin.findOne({_id:req.auth.user_id, code:req.auth.user_code, email:req.auth.user_email, statut:req.auth.statut})
            .then(admin=>{
                if(!admin) return res.status(400).json({msg: `Veuillez vous authentifier pour avoir accès aux données demandées`})
                Car.find({climatisation: req.body.climatisation, statut:1})
                .then(car=>{
                    if(car.length === 0) return res.status(400).json({msg: "Aucun vehicule n'est climatisé"})
                    res.status(200).json({msg: `Il y a ${car.length} vehicules climatisé(s)`, data: car})
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


    static async updateCar(req,res){
        try {
            console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@',33333333)
            Admin.findOne({_id:req.auth.user_id, code:req.auth.user_code, email:req.auth.user_email, statut:req.auth.statut})
            .then(admin=>{
                if(!admin) return res.json({msg: "Veuillez-vous authentifier !"});
                Car.findOne({_id:req.body.id, statut:1})
                .then((car)=>{
                    if(car){
                        if(req.file){req.body.photo=req.file.path;}
                        Car.updateOne({_id: req.body.id, statut:1},{...req.body, updatedAt:new Date()})
                        .then((newCar)=>{
                            if(newCar.modifiedCount === 0) return res.status(401).json({msg: "Aucune modifiction n'a été faite !"});
                            Car.findOne({_id: req.body.id, statut:1})
                            .then(updated=>{
                                res.status(200).json({msg: "Modification effectué avec succès", admin: updated});
                            }) 
                        })
                        .catch((error)=> {
                            console.log(error);
                            res.status(404).json({msg: error.message});
                        })
                    }
                    else{
                        console.log(`Aucune modification n'a été effectuée cas les données à supprimer n'existent pas.`);
                        res.status(400).json({msg: `Aucune modification n'a été effectuée cas les données à supprimer n'existent pas.`});
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

    static async deleteCar(req,res){
        try {
            Admin.findOne({_id:req.auth.user_id, code:req.auth.user_code, email:req.auth.user_email, statut:req.auth.statut})
            .then(admin=>{
                if(!admin) return res.json({msg: "Veuillez-vous authentifier !"});
                Car.findOne({_id:req.body.id, statut:1})
                .then((data)=>{
                    if(data){
                        if(req.file){req.body.photo=req.file.path;}
                        Car.updateOne({_id: req.body.id, statut: 1},{statut:0, updatedAt:new Date()})
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
module.exports = CarController;