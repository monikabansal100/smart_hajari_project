
const express = require("express");
const router = express.Router();

const sectionMasterController = require('../../controllers/institute/sectionController.js');
const  authenticateToken  = require("../../middlewares/institute/authorization.js");


router.post('/',authenticateToken, sectionMasterController.createSectionMaster)
router.get('/',authenticateToken, sectionMasterController.getAllSectionMaster)
router.put('/:id',authenticateToken, sectionMasterController.updateSectionMaster)
router.delete('/:id',authenticateToken, sectionMasterController.deleteSectionMaster)





module.exports = router;





