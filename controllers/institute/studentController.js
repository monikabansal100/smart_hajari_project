
const { Op } = require("sequelize");
const asyncHandler = require("../../utils/asyncHandler");
const db = require("../../models/institute");
let studentModel = db.studentModel;
let promoDb = db.promotionModel
let classDb = db.classMaster
let sessionDb = db.sessionMaster
let sectionDb = db.sectionMaster
let streamDb = db.streamMaster


const createStudent = asyncHandler(async (req, res) => {
    let data = req.body
    let { studentName, contact, alternateContact, address, admissionNo, admissionDate, srNo, fathersName, mothersName, email, photo,deviceId } = data;


    if (req.file) {
        photo = req.file.path; 
    } else {
        photo = 'assets';  
    }

    data.photo = photo


    const instituteId = req.instituteToken.instituteId;
    const userId = req.userToken.instituteId;


    const studentData = await studentModel.create({
        studentName, contact, alternateContact, address, admissionNo, admissionDate, srNo, photo, fathersName, mothersName, email,deviceId,
        instituteId: instituteId,
        userId: userId

    })

    let student = await studentModel.findOne({ where: { email } })


    let proboData = req.body
    let info = {
        classMasterId: proboData.classMasterId,
        streamMasterId: proboData.streamMasterId,
        sectionMasterId: proboData.sectionMasterId,
        sessionMasterId: proboData.sessionMasterId,
        deviceId: proboData.deviceId,
        admissionDate: proboData.admissionDate,
        admissionNo: proboData.admissionNo,
        srNo: proboData.srNo,
        studentMasterId: student.id,
        instituteId: instituteId,
        userId: userId
    }

    let promotionData = await promoDb.create(info)

    res.status(201).send({ action: true, message: "student created successfully", data: studentData });
});



const getAllStudentMaster = asyncHandler(async (req, res) => {
    let data = req.body
    let { sessionMasterId, classMasterId, streamMasterId, sectionMasterId, page, limit } = data
    // console.log(limit);


    if (!sessionMasterId) {
        return res.status(400).send({ action: false, message: "sessionMasterId is required" });
    }

    let whereClause = { sessionMasterId, isDelete: 0 };

    if (classMasterId) whereClause.classMasterId = classMasterId;
    if (streamMasterId) whereClause.streamMasterId = streamMasterId;
    if (sectionMasterId) whereClause.sectionMasterId = sectionMasterId;

    let getAllStudentMaster = await promoDb.findAll(
        {
            include: [
                { model: classDb },
                { model: sessionDb },
                { model: sectionDb },
                { model: streamDb }
            ],
            where: whereClause,
            limit: limit,
            offset: (page - 1) * limit,
        })


    return res.status(200).send({
        action: true,
        message: "Listings successful",
        data: getAllStudentMaster
    });
});



const updateStudentMaster = asyncHandler(async (req, res) => {
    const promotionId = req.params.id;
    const data = req.body;
    let { classMasterId, streamMasterId, sectionMasterId, sessionMasterId, studentName, contact, admissionDate, admissionNo, srNo, alternateContact, address, fathersName, mothersName, email } = data

    // console.log(data);
    let promotionData = await promoDb.findByPk(promotionId)
    if (!promotionData) {
        return res.status(404).send({ action: false, message: "promotion Not Found" });
    }
    // console.log(promotionData);

    let updatedPromotion = await promoDb.update({ classMasterId, streamMasterId, sectionMasterId, sessionMasterId }, { where: { id: promotionId } });


    let studentMasterId = promotionData.studentMasterId


    let updatedStudent = await studentModel.update({ studentName, contact, admissionDate, admissionNo, srNo, alternateContact, address, fathersName, mothersName, email }, { where: { id: studentMasterId } });

    if (updatedStudent) {
        const updatedSection = await studentModel.findOne({ where: { id: studentMasterId } });
        return res.status(200).send({
            action: true,
            message: "student updated successfully",
            data: updatedSection
        });
    } else {
        return res.status(400).send({
            action: false,
            message: "Failed to update student",
            data: null
        });
    }

});


const deleteStudentMaster = asyncHandler(async (req, res) => {
    const promotionId = req.params.id;

    const [affectedRows] = await promoDb.update(
        { isDelete: 1 },
        { where: { id: promotionId } }
    );

    if (affectedRows > 0) {
        return res.status(200).send({
            action: true,
            message: "Student successfully marked as deleted!"
        });
    } else {
        return res.status(404).send({
            action: false,
            message: "Student not found or already deleted!"
        });
    }
});




const createBulkAdmission = asyncHandler(async (req, res) => {
    let students = req.body;

    if (!Array.isArray(students) || students.length === 0) {
        return res.status(400).json({ message: 'Request body must be a non-empty array' });
    }

    const instituteId = req.instituteToken.instituteId;
    const userId = req.userToken.userId;

    const bulkData = students.map((student) => {
        const { studentName, contact, alternateContact, address, admissionNo, admissionDate, srNo, fathersName, mothersName, email,deviceId } = student;


        return {
            studentName,
            contact,
            alternateContact,
            address,
            admissionNo,
            admissionDate,
            srNo,
            fathersName,
            mothersName,
            email,
            deviceId,
            instituteId,
            userId,

        };
    });

    const bulkAdmission = await studentModel.bulkCreate(bulkData);

    res.status(201).json({
        action: true,
        message: "Bulk admission created successfully",
        data: bulkAdmission
    });
});





module.exports = { createStudent, getAllStudentMaster, updateStudentMaster, deleteStudentMaster, createBulkAdmission };














