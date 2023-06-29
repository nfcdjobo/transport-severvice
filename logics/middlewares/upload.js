const path = require(`path`);
const multer = require(`multer`);
let storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, `stockage/`);
        console.log('uploaded or no One');
    },
    filename: function(req, file, cb){
        let ext = path.extname(file.originalname); //On récupère le nom original de l'image
        cb(null, Date.now() + ext);
    }
})

let Upload = multer({
    storage: storage,
    fileFilter: function(req, file, callback){
        if(file.mimetype === `image/png` || file.mimetype === `image/svg` || file.mimetype === `image/jpg` || file.mimetype === `image/jpeg`){
            console.log('uploaded or no extension');
            callback(null, true);
        }else{
            console.log('uploaded or no One');
            console.log(`Seule les image d'extention .png, .svg, .jpg et jpeg sont recommandés.`);
            callback(null, false)
        }
    },
    limits:{fileSize:1024*1024*2}
});
let Telecharger=Upload.single("photo");
module.exports=Telecharger;


