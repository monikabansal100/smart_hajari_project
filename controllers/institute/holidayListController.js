require("dotenv").config()
const { Op, where } = require("sequelize");
const moment = require('moment');
const asyncHandler = require("../../utils/asyncHandler");
const db = require("../../models/institute");
let attendenceModel = db.attendenceModel
let studentModel = db.studentModel;
let promoDb = db.promotionModel
let holidayList = db.holidayList
let holiday = db.holiday




const createHolidayList = asyncHandler(async (req, res) => {
    const data = req.body;
    let {title, startDate, endDate, type, days, sessionMasterId, date} = data;

    const instituteId = req.instituteToken.instituteId;
    const userId = req.userToken.instituteId;

    // Create holiday list
    const holidayListData = await holidayList.create({
        title, 
        startDate, 
        endDate, 
        type, 
        days, 
        sessionMasterId,      
        instituteId,
        userId
    });

    // Create individual holidays
    let holidayData = await holiday.create({
        date, 
        title, 
        type, 
        sessionMasterId,
        instituteId,
        userId,
        holidayListId: holidayListData.id  // Link the holiday to the holiday list
    });

    // Return both holiday list and holiday data
    res.status(200).json({
        action: true,
        message: "Holiday list and holiday created successfully",
        holidayList: holidayListData,
        holiday: holidayData
    });
});



const getHolidayList = asyncHandler(async (req, res) => {

    let getHolidayList = await db.holidayList.findAll({where:{isDelete: 0}});

    return res.status(200).send({ action: true, message: "listing", data: getHolidayList });
});




const updateHolidayList = asyncHandler(async (req, res) => {
    const holidayListId = req.params.holidayListId;
    const data = req.body;

    // console.log(data);
    // console.log(holidayListId);

    let checkId = await holidayList.findByPk(holidayListId)
    if (!checkId) {
        return res.status(404).send({ action: false, message: "holiday list Not Found" });
    }


    const updated = await holidayList.update(data, { where: { id: holidayListId } });

    if (updated) {
        const updatedSection = await holidayList.findOne({ where: { id: holidayListId } });
        return res.status(200).send({
            action: true,
            message: "holidayList updated successfully",
            data: updatedSection
        });
    } else {
        return res.status(400).send({
            action: false,
            message: "Failed to update holidayList",
            data: null
        });
    }
});




const deleteHolidayList = asyncHandler(async (req, res) => {
    const holidayListId = req.params.holidayListId;

    if (!holidayListId) {
        return res.status(400).send({
            action: false,
            message: "holidayListId is required"
        });
    }

    const [affectedRows] = await holidayList.update(
        { isDelete: 1 }, 
        { where: { id: holidayListId }}
    );

    if (affectedRows > 0) {
        return res.status(200).send({
            action: true,
            message: "holidayList deleted successfully!"
        });
    } else {
        return res.status(404).send({
            action: false,
            message: "holidayList not found!"
        });
    }
});





module.exports = {createHolidayList ,getHolidayList, updateHolidayList, deleteHolidayList };







