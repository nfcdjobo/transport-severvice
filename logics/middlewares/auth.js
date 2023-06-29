const jwt = require('jsonwebtoken')
module.exports = (req, res, next) => {
    try {
        let token = req.headers.authorization.split(" ")[1];
        let decodeToken = jwt.verify(token, 'PRIVATE_TOKEN_KEY');
        const user_id =  decodeToken.user_id;
        const user_code = decodeToken.user_code;
        const user_email = decodeToken.user_email;
        const statut = decodeToken.statut;
        req.auth = {user_id: user_id, user_code: user_code, user_email: user_email, statut: statut};
        next();
    } catch (error) {
        console.log(error);
        res.status(404).json({error: error.message})
    }
}