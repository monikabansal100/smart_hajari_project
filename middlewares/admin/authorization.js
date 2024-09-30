// const { JWT_SECRET } = process.env;
// const jwt = require('jsonwebtoken')


// let authenticateToken = (req, res, next) => {

//     try {
//         let adminUserToken = req.headers['cookie']
//         if (adminUserToken) {
//             {
//                 if (adminUserToken.split('adminUserToken')) {
//                     let token = adminUserToken.split('=')[1];
//                     // console.log("token", token);

//                     let checkToken = jwt.verify(token, process.env.JWT_SECRET)
//                     // console.log("checktoken", checkToken);

//                     req.userToken = checkToken;
//                     next()

//                 } else {
//                     throw new Error('Invalid token format');
//                 }
//             }
//         }

//     } catch (err) {
//         console.log(err)
//         res.status(401).json({ message: err.message })
//     }
// }



// module.exports = { authenticateToken }




//======================================================


const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    try {
        const cookies = req.headers['cookie']?.split(';').map(cookie => cookie.trim());
        const tokenCookie = cookies?.find(cookie => cookie.startsWith('adminUserToken='));
        
        if (!tokenCookie) throw new Error('Authentication token is required');

        const token = tokenCookie.split('=')[1];
        req.userToken = jwt.verify(token, process.env.JWT_SECRET);

        next();
    } catch (err) {
        console.log(err);
        res.status(401).json({ message: err.message });
    }
};




module.exports = { authenticateToken };

