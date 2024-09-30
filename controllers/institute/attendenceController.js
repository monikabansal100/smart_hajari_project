require("dotenv").config()
const { Op, where } = require("sequelize");
const moment = require('moment');
const asyncHandler = require("../../utils/asyncHandler");
const nodemailer = require('nodemailer');
const db = require("../../models/institute");
let attendenceModel = db.attendenceModel
let studentModel = db.studentModel;
let promoDb = db.promotionModel





const createAttendence = asyncHandler(async (req, res) => {
    const data = req.body;

    if (!Array.isArray(data) || data.length === 0) {
        return res.status(400).json({ message: 'Request body must be a non-empty array' });
    }

    const instituteId = req.instituteToken.instituteId;
    const userId = req.userToken.instituteId;

    if (!instituteId) {
        return res.status(400).json({ action: false, message: "InstituteId is required" });
    }

    const bulkData = data.map(entry => {
        const {
            admissionNo,
            promotionid,
            date,
            isPresent,
            direction,
            classMasterId,
            streamMasterId,
            deviceLogId,
            sectionMasterId,
            sessionMasterId,
            studentMasterId,
            ismail
        } = entry;

        return {
            admissionNo,
            promotionid,
            date,
            direction,
            classMasterId,
            streamMasterId,
            sectionMasterId,
            sessionMasterId,
            deviceLogId,
            studentMasterId,
            instituteId,
            userId,
            isPresent,
            ismail
        };
    });

    for (const entry of bulkData) {
        const { sessionMasterId, promotionid, admissionNo, date } = entry;

        if (!sessionMasterId || !promotionid || !admissionNo || !date) {
            console.log('Skipping entry due to missing required fields:', {
                sessionMasterId,
                promotionid,
                admissionNo,
                date
            });
            continue;
        }

        const checkData = await attendenceModel.findOne({
            where: {
                sessionMasterId,
                promotionid,
                admissionNo,
                date: new Date(date),
                instituteId
            }
        });
        // console.log(checkData);


        if (checkData) {
            // console.log('Record found, updating attendance:', checkData.id);
            await attendenceModel.update(
                { isPresent: entry.isPresent },
                { where: { id: checkData.id } }
            );
        } else {
            // console.log('No record found, creating new attendance entry.');
            await attendenceModel.create(entry);
        }
    }

    res.status(200).json({
        action: true,
        message: "Attendance created successfully"
    });
});




const getAttendanceByDate = asyncHandler(async (req, res) => {
    const data = req.body;
    const { sessionMasterId, classMasterId, streamMasterId, sectionMasterId, date } = data;
    const instituteId = req.instituteToken.instituteId;

    if (!instituteId) {
        return res.status(400).json({ action: false, message: "InstituteId is required" });
    }

    const getStudentByDate = await promoDb.findAll({
        where: {
            sessionMasterId,
            classMasterId,
            streamMasterId,
            sectionMasterId,
            instituteId
        },
        include: [
            {
                model: studentModel,
                required: true
            },
            {
                model: attendenceModel,
                required: false,
                where: {
                    date: new Date(date),
                    instituteId
                }
            }
        ]
    });

    if (!getStudentByDate || getStudentByDate.length === 0) {
        return res.status(404).json({ action: false, message: "No promotion or attendance records found for the given criteria." });
    }

    res.status(200).json({
        action: true,
        data: getStudentByDate
    });

});





const getAttendanceByMonth = asyncHandler(async (req, res) => {
    let data = req.body;
    let { promotionid, sessionMasterId, month, year } = data;
    const instituteId = req.instituteToken.instituteId;

    if (!instituteId) {
        return res.status(400).json({ action: false, message: "InstituteId is required" });
    }

    // Define the start and end of the month
    const startOfMonth = moment({ year, month: month - 1 }).startOf('month').toDate();  // Adjust for month index (0-based)
    const endOfMonth = moment({ year, month: month - 1 }).endOf('month').toDate();

    // Fetch the promotion record
    const promotion = await promoDb.findOne({
        where: {
            sessionMasterId,
            instituteId,
            id: promotionid,
        },
        include: [
            {
                model: studentModel,  
                required: true
            }
        ]
    });

    if (!promotion) {
        return res.status(404).json({ action: false, message: "Promotion record not found." });
    }

    // Fetch attendance records for the student within the date range
    const attendances = await attendenceModel.findAll({ 
        where: {
            studentMasterId: promotion.studentMasterId,
            date: {
                [Op.between]: [startOfMonth, endOfMonth]  
            },
            instituteId
        }
    });

    // Create a map of attendance dates for quick lookup
    const attendanceMap = new Map(attendances.map(att => [moment(att.date).format('YYYY-MM-DD'), att]));

    // Generate the attendance details for each day in the month
    const daysInMonth = moment(startOfMonth).daysInMonth();
    const attendanceDetails = [];

    for (let day = 1; day <= daysInMonth; day++) {
        const currentDay = moment({ year, month: month - 1, day });
        const formattedDate = currentDay.format('YYYY-MM-DD');
        const isSunday = currentDay.day() === 0;  // Check if the day is Sunday

        let attendanceRecord = attendanceMap.get(formattedDate);
        if (!attendanceRecord) {
            attendanceRecord = { isPresent: 2 };  // Default to 2 (Absent) if no record exists
        }

        // If it's a Sunday, mark `isPresent` as `4`
        const isPresent = isSunday ? 4 : (attendanceRecord.isPresent === 1 ? 1 : (attendanceRecord.isPresent === 0 ? 2 : attendanceRecord.isPresent));
        
        attendanceDetails.push({
            date: formattedDate,
            isPresent
        });
    }

    res.status(200).json({
        action: true,
        data: {
            promotion,
            attendance: attendanceDetails
        }
    });
});



module.exports = { createAttendence, getAttendanceByDate, getAttendanceByMonth };







