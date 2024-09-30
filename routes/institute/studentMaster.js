
const express = require("express");
const router = express.Router();

const studentController = require('../../controllers/institute/studentController.js');
const  authenticateToken  = require("../../middlewares/institute/authorization.js");
const upload = require('../../middlewares/upload.js');


router.post('/',authenticateToken, upload('upload/1/student', 'photo'),  studentController.createStudent)
router.post('/fatch',authenticateToken, studentController.getAllStudentMaster)
router.put('/:id',authenticateToken, studentController.updateStudentMaster)
router.delete('/:id',authenticateToken, studentController.deleteStudentMaster)
router.post('/bulkAdmission',authenticateToken, studentController.createBulkAdmission)





module.exports = router;





