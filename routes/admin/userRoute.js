const express = require("express");
const router = express.Router();

const functionRouter = require('../../controllers/admin/auth/UserController.js')

// const {authenticateToken} = require('../../middlewares/admin/authorization.js')



router.post('/login',functionRouter.login)
// router.get('/profile',authenticateToken,functionRouter.profile)
router.post('/createUser',functionRouter.createUser)




module.exports = router




