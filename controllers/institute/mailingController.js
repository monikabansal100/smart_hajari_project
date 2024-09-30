require("dotenv").config()
const { Op } = require("sequelize");
const asyncHandler = require("../../utils/asyncHandler");
const nodemailer = require('nodemailer');
const db = require("../../models/institute");
let attendenceModel = db.attendenceModel


const transporter = nodemailer.createTransport({
    host: "smtp.office365.com",
    port: 587,
    secure: false, // Use STARTTLS
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
    tls: {
        ciphers: 'SSLv3'
    },
    debug: true // Enable debugging to catch issues
});



if (ismail === 1 && to) {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: to,
        subject: 'Attendance Details',
        text: text
    };

    transporter.sendMail(mailOptions);

    res.status(201).json({ message: 'Email sending initiated and entry created successfully', data: newEntry });
} else {
    res.status(201).json({ message: 'Entry created successfully but email not sent', data: newEntry });
}





const createAttendence = asyncHandler(async (req, res) => {

    let data = req.body
    // console.log(data);

    let { to,
        subject,
        text,
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
        ismail } = data


        let checkData= await attendenceModel.findOne({sessionMasterId, })



    const instituteId = req.instituteToken.instituteId;
    const userId = req.userToken.instituteId;

    if (!instituteId) {
        return res.status(400).send({ action: false, message: "InstituteId is required" });
    }


    const newEntry = await attendenceModel.create({
        to,
        subject,
        text,
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
        ismail,
        instituteId: instituteId,
        userId: userId
    });



});




module.exports = { createAttendence };





