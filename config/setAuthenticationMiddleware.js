require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports.checkAuthentication = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        if(!token){
            return res.status(401).json({
                message: 'Authorization token needed'
            });
        }
        let user = jwt.verify(token, process.env.JWTSECRETKEY);
        req.user = user;
        return next();
    } catch (error) {
        console.log('error: ', error);
        return res.status(401).json({
            message: 'Unauthorized Access'
        });
    }
}