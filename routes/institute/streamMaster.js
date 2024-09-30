
const express = require("express");
const router = express.Router();

const streamMasterController = require('../../controllers/institute/streamController.js');
const  authenticateToken  = require("../../middlewares/institute/authorization.js");


router.post('/',authenticateToken, streamMasterController.createStreamMaster)
router.get('/',authenticateToken, streamMasterController.getAllStreamMaster)
router.put('/:id',authenticateToken, streamMasterController.updateStreamMaster)
router.delete('/:id',authenticateToken, streamMasterController.deleteStreamMaster)





module.exports = router;





