const express = require("express");
const router = express.Router();



router.use('/api/admin/auth/user', require("./admin/userRoute.js"));
router.use('/api/admin/school', require("./admin/InstituteRoute.js"));

router.use('/api/institute/auth', require("./institute/userInstitute.js"));


router.use('/api/institute/classMaster', require("./institute/classMaster.js"));
router.use('/api/institute/streamMaster', require("./institute/streamMaster.js"));
router.use('/api/institute/sectionMaster', require("./institute/sectionMaster.js"));
router.use('/api/institute/sessionMaster', require("./institute/sessionMaster.js"));
router.use('/api/institute/student', require("./institute/studentMaster.js"));
router.use('/api/institute/attendence', require("./institute/dayAttendenceStore.js"));
router.use('/api/institute/holidayList', require("./institute/holidayList.js"));




module.exports = router;



