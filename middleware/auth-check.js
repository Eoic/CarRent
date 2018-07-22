const jwt = require('jsonwebtoken');
const User = require('../models/User');
const config = require('../config');

/**
 * Authorization checker. 
 */
module.exports = (req, res, next) => {
    if(!req.headers.authorization)
        return res.status(401).end();

    // Get bearer token.
    const token = req.headers.authorization.split(' ')[1];

    return jwt.verify(token, config.jwtSecret, (err, decoded) => {
        
        // Unathorized.
        if(err)
            return res.status(401).end();

        const userId = decoded.sub;

        // Check for user.
        return User.findById(userId, (userErr, user) => {
            if(userErr || !user)
                return res.status(401).end();

                req.user = user;
                return next();
        });
    });
};