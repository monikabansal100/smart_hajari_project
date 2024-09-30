
const express = require("express");
const router = express.Router();

const attendenceController = require('../../controllers/institute/attendenceController.js');
const  authenticateToken  = require("../../middlewares/institute/authorization.js");


router.post('/',authenticateToken, attendenceController.createAttendence)
router.get('/',authenticateToken, attendenceController.getAttendanceByDate)
router.get('/getByMonth',authenticateToken, attendenceController.getAttendanceByMonth)






module.exports = router;





