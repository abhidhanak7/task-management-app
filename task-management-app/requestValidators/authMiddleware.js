const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const secretKey = process.env.JWT_SECRET_KEY;


const authMiddleware = (req, res, next) => {
    let token = req.headers['authorization']

    if(token && token.startsWith('Bearer ')){
        token = token.replace('Bearer ', '');
    }
    else{
        return res.status(401).json({
            statusCode: 401,
            message: 'Unauthorized Access Denied',
          });
    }

    jwt.verify(token, secretKey, (err, user) => {
        if (err) {
          return res.status(403).json({ message: 'Invalid token' });
        }
        req.user = user;
        next();
      });

}

module.exports = {authMiddleware};