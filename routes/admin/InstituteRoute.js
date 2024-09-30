
const express = require("express");
const router = express.Router();

const functionRouter = require('../../controllers/admin/InstituteController.js');
const upload = require('../../middlewares/upload.js');
const {authenticateToken}  = require('../../middlewares/admin/authorization.js');



router.post('/',authenticateToken, upload('upload/school', 'logo'), functionRouter.createSchool);
router.get('/',authenticateToken, functionRouter.getAllSchool);
router.put('/:id',authenticateToken, upload('upload/school', 'logo'), functionRouter.updateSchool);
router.delete('/:id',authenticateToken, functionRouter.deleteSchool);



module.exports = router;


