require('dotenv').config()
const { response } = require('express');
const jwt = require('jsonwebtoken')



let authenticateToken = (req, res, next) => {
    try {
        let instituteToken = req.headers['cookie'];

        if (instituteToken) {
            {
                if (instituteToken.split('instituteToken')) {
                    let token = instituteToken.split('instituteToken=')[1];
                    // console.log(token);

                    jwt.verify(token, process.env.JWT_SECRET, (err, response) => {
                        if (err) {
                            throw new Error('token not verified')
                        }
                        req.instituteToken = response;
                        req.userToken = response;
                        next()

                    })
                } else {
                    throw new Error('Invalid token format');
                }
            }
        } else {
            throw new Error('Authentication token is required');
        }
    } catch (err) {
        console.log(err);
        res.status(401).json({ message: err.message });
    }
};





module.exports = authenticateToken;
