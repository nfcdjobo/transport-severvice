const Slider = require(`../models/sliderModel`);
const Admin = require(`../models/adminModel`);
class SliderController{
   static async create(req, res){ // On trouve en fonction de la cle primière du catégorie
        try{
            let code = 1;
            Admin.findOne({_id:req.auth.user_id, code:req.auth.user_code, email:req.auth.user_email, statut:req.auth.statut})
            .then(admin=>{
                if(admin){
                        Slider.findOne({photo: req.body.photo})
                        .then(slider=>{
                            if(slider){console.log("Vous n'avez pas fournir assez d'informations pour pouvoir effectuer cette requette. Veuillez donc vous connecter pour y parvenir.");return res.status(400).json({message: "Vous n'avez pas fournir assez d'informations pour pouvoir effectuer cette requette. Veuillez donc vous connecter pour y parvenir."})}
                            Slider.find({})
                            .then((allSlider)=>{
                                if(allSlider.length > 0) {code = allSlider.length+1;}
                                if(allSlider.length<4){
                                    if(req.file){req.body.photo=req.file.path;}
                                    let newSlider = new Slider({... req.body, code: `SLIDER${code}`});
                                    newSlider.save()
                                    .then((add)=>{console.log(add); res.status(200).json({message:"Ligne ajoutée avec succès !", slider: add})})
                                    .catch((error)=>{console.log(error); res.status(401).json({error:error.message})});
                                }else{res.status(400).json({msg: `Impossible ajoute au delà de 3 slider de premier niveau.`}) }
                            })
                            .catch(error=>res.status(400).json({error:error}));
                        })
                        .catch(error=>{
                            res.status(501).json({message: "Réquette erronnée", error: error})
                        })
                    }else{
                        res.status(500).json({message: "Veuillez d'abord vous authentifier !"});
                        return
                    }
                }
            )
            .catch((error)=>{
                res.status(500).json({error: error.message});
            })
        }catch(error){
            const message = `URL non valable`;
            res.status(500).json({message: message, data: error.message});
        }
    }

    static async allSlider(req, res){
        try{
            Slider.find({})
            .then(allSlider=> {
                const message = `Il y'a ${allSlider.length} élémnents disponible(s).`;
                res.status(200).json({message: message, data: allSlider});
            })
            .catch((error)=>{
                const message = `Aucun élément trouvé`;
                res.status(400).json({message: message, data: error.message});
            })
        }catch(error){
            res.status(500).json({data: error.message});
        }
    }


    static async updateSlider(req,res){
        try {
            Admin.findOne({_id:req.auth.user_id, code:req.auth.user_code, email:req.auth.user_email, statut:req.auth.statut})
            .then(admin=>{
                if(!admin) return res.json({message: "Veuillez-vous authentifier !"});
                Slider.findOne({code:req.body.code, statut:1})
                .then((slider)=>{
                    if(slider){
                        if(req.file){req.body.photo=req.file.path;}
                        Slider.updateOne({_id: req.body.id, statut:1},{...req.body})
                        .then((newSlider)=>{
                            if(newSlider.modifiedCount === 0) return res.status(401).json({message: "Aucune modifiction n'a été faite !"});
                            Slider.findOne({_id: req.body.id, statut:1})
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

    
}
module.exports = SliderController;