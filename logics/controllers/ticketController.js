const Ligne = require('../models/ligneModel');
const Admin = require('../models/adminModel');
const Car = require('../models/carModel');
const Voyage = require('../models/voyageModel');
const Ticket = require('../models/ticketModel')
class TicketController{
    static async create(req, res){ // On trouve en fonction de la cle primière du catégorie
        try{
            let code = 1;
            Admin.findOne({_id:req.auth.user_id, code:req.auth.user_code, email:req.auth.user_email, statut:req.auth.statut})
            .then(admin=>{
                if(admin){
                    Ticket.find({})
                    .then(all=>{
                        if(all.length > 0) {code = all.length+1;}
                        Ligne.findOne({_id:req.body.ligne_id, statut:1})
                        .then(ligne=>{
                            req.body.montant = ligne.montant;
                            let newVoyage = new Ticket({... req.body, compagny_id: admin.compagny_id, admin_id: admin._id, ligne_id: req.body.ligne_id, code: `TICKET${code}`});
                            newVoyage.save()
                            .then((add)=>{
                                console.log(add); 
                                return res.status(200).json({message:"voyage ajoutée avec succès !", voyage: add})
                            })
                            .catch((error)=>{
                                console.log(error);
                                return res.status(401).json({error:error.message})
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

    static async allTicket(req, res){
        try{
            Admin.findOne({_id:req.auth.user_id, code:req.auth.user_code, email:req.auth.user_email, statut:req.auth.statut})
            .then(admin=>{
                if(!admin) return res.status(400).json({message: `Veuillez vous authentifier pour avoir accès aux données demandées`})
                Ticket.find({statut:1}).then(ticket=>{
                    res.status(200).json({message: `Il y a ${ticket.length} élément(s) trouvé(s)`, data: ticket})
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
                Ticket.findOne({_id: req.body.id, statut:1})
                .then(ticket=>{
                    res.status(200).json({message: `Un élément est retrouvé`, data: ticket})
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
                Ticket.findOne({code: req.body.code, statut:1})
                .then(ticket=>{
                    res.status(200).json({message: `Un élément est retrouvé`, data: ticket})
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

    static async getByMontantTicket(req, res){
        try{
            let code = 1;
            Admin.findOne({_id:req.auth.user_id, code:req.auth.user_code, email:req.auth.user_email, statut:req.auth.statut})
            .then(admin=>{
                if(!admin) return res.status(400).json({message: `Veuillez vous authentifier pour avoir accès aux données demandées`})
                Ticket.find({montant: req.body.montant, statut:1})
                .then(ticket=>{
                    if(ticket.length === 0) return res.status(401).json({message: `Cette marque n'est pas encore disponible.`})
                    res.status(200).json({message: `Réquette traitée avec succès.`, data: ticket})
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

}
module.exports = TicketController;