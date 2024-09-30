const { Op } = require("sequelize");
const bcrypt = require("bcrypt")
const db = require("../../models/admin/index")
const instDb = require("../../models/institute/index")
const asyncHandler = require("../../utils/asyncHandler")
const authenticateToken = require("../../middlewares/admin/authorization")
const validation= require("../../middlewares/val.js")
const jwt = require('jsonwebtoken');
const UserInstituteModel = instDb.UserInstituteModel


const createSchool = asyncHandler(async (req, res) => {
    let data = req.body
    let { schoolName, schoolContact, schoolEmail, name, email, contact, address, regNo, district, state, planMasterId, studentCount, isActive, roleMasterId, password, contactPersonName, role, expDate, isUpdate } = data

    let logo= req.file.path
    data.logo= logo

    let validate=validation(req)
    if(validate){
        throw new Error(validate)
    }


    if (!name || !schoolName) {
        return res.status(400).send({ action: false, message: "name and schoolName is required" });
    }
    if (!password) {
        return res.status(400).send({ action: false, message: "Password is required" });
    }
    if (!email || !schoolEmail) {
        return res.status(400).send({ action: false, message: "email and schoolEmail is required" });
    }
    if (!contact || !schoolContact) {
        return res.status(400).send({ action: false, message: "contact and schoolContact is required" });
    }


    let dataHash = await bcrypt.hash(password, 10);
    if (!dataHash) {
        return res.status(400).send({ action: false, message: "Unable to hash password" });
    }
    data.authCode = data.password;
    data.password = dataHash;
    data.adminUserId = req.userToken.adminUserId;
    // logo = req.file.path


    const savedData = await db.InstituteModel.create(data);

    if (!savedData) {
        return res.status(500).send({ action: false, message: "Failed to create school" });
    }

    let info = {
        id: savedData.id,
        name: savedData.name,
        email: savedData.email,
        instituteId: savedData.id,
        password: savedData.password,
        authCode: savedData.authCode,
        contact: savedData.contact,
        isActive: 1
    }


    const instituteUser = await UserInstituteModel.create(info);
    if (!instituteUser) {
        return res.status(500).send({ action: false, message: "Failed to create user for school" });
    }


    return res.status(201).send({ action: true, message: "school created successfully", data: savedData });

});


const getAllSchool = asyncHandler(async (req, res) => {

    let allInstitute = await db.InstituteModel.findAll({});

    return res.status(200).send({ action: true, message: "listing", data: allInstitute });
});



const updateSchool = asyncHandler(async (req, res) => {
    const schoolId = req.params.id;
    const data = req.body;
    const logoFile = req.file;


    // console.log(data);
    let checkId= await db.InstituteModel.findByPk(schoolId)
    if( !checkId){
        return res.status(404).send({ action: false, message: "School Not Found" });
    }

    if (logoFile) {
        data.logo = logoFile.path;
    }

    const updated = await db.InstituteModel.update(data, { where: { id: schoolId } });

    if (updated) {
        const updatedSchool = await db.InstituteModel.findOne({ where: { id: schoolId } });
        return res.status(200).send({
            action: true,
            message: "School updated successfully",
            data: updatedSchool
        });
    } else {
        return res.status(400).send({
            action: false,
            message: "Failed to update school",
            data: null
        });
    }
});



const deleteSchool = asyncHandler(async (req, res) => {
 
    let school = await db.InstituteModel.destroy({ where: { id: req.params.id } });
    if (school) {
        return res.status(200).send({
            action: true,
            message: "school Deleted!!"
        })
    } else {
        return res.status(400).send({
            action: false,
            message: "school Not Found!!"
        })
    }
})






module.exports = { createSchool, getAllSchool, updateSchool, deleteSchool }




