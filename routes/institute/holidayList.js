
const express = require("express");
const router = express.Router();

const holidayListController = require('../../controllers/institute/holidayListController.js');
const  authenticateToken  = require("../../middlewares/institute/authorization.js");


router.post('/',authenticateToken, holidayListController.createHolidayList)
router.get('/',authenticateToken, holidayListController.getHolidayList)
router.put('/:holidayListId',authenticateToken, holidayListController.updateHolidayList)
router.delete('/:holidayListId',authenticateToken, holidayListController.deleteHolidayList)







module.exports = router;





