
const express = require("express");
const router = express.Router();

const sessionMasterController = require('../../controllers/institute/sessionMasterController.js');
const  authenticateToken  = require("../../middlewares/institute/authorization.js");


router.post('/',authenticateToken, sessionMasterController.createSessionMaster)
router.get('/',authenticateToken, sessionMasterController.getAllSessionMaster)
router.put('/:id',authenticateToken, sessionMasterController.updateSessionMaster)
router.delete('/:id',authenticateToken, sessionMasterController.deleteSessionMaster)





module.exports = router;





