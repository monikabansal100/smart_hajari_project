
const express = require("express");
const router = express.Router();

const classMasterController = require('../../controllers/institute/classController.js');
const  authenticateToken  = require("../../middlewares/institute/authorization.js");


router.post('/',authenticateToken, classMasterController.createClassMaster)
router.get('/',authenticateToken, classMasterController.getAllClassMaster)
router.put('/:id',authenticateToken, classMasterController.updateClassMaster)
router.delete('/:id',authenticateToken, classMasterController.deleteClassMaster)





module.exports = router;





