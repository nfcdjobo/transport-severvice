const mongoose = require('mongoose');
mongoose.connect(`mongodb+srv://nfcdjobo:nfcdjobo@transport.hrhlbed.mongodb.net/?retryWrites=true&w=majority`,{useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{
    console.log('Connexion éffectuée avec succès');
})
.catch(error=>{
    console.log(`Connexin non établie: \n ${error}`);
})
module.exports = mongoose;
