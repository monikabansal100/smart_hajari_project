
const { Op } = require("sequelize");
const asyncHandler = require("../../utils/asyncHandler");
const db = require("../../models/institute");
let streamMaster = db.streamMaster;


const createStreamMaster = asyncHandler(async (req, res) => {

    let { name, type = "self" } = req.body

    if (!name) {
        return res.status(400).send({ action: false, message: "Name is required" });
    }
    const instituteId = req.instituteToken.instituteId;
    const userId = req.userToken.instituteId;

    if (!instituteId) {
        return res.status(400).send({ action: false, message: "InstituteId is required" });
    }

    const streamMasterData = await streamMaster.create({
        name,
        type,
        instituteId: instituteId,
        userId: userId

    })

    // console.log(streamMasterData)
    res.status(201).send({ action: true, message: "stream master created successfully", data: streamMasterData });
});


const getAllStreamMaster = asyncHandler(async (req, res) => {

    let getAllStreamMaster = await db.streamMaster.findAll({ where: { isDelete: 0 } });

    return res.status(200).send({ action: true, message: "listing", data: getAllStreamMaster });

});


const updateStreamMaster = asyncHandler(async (req, res) => {
    const streamMasterId = req.params.id;
    const data = req.body;

    // console.log(data);
    let checkId = await streamMaster.findByPk(streamMasterId)
    if (!checkId) {
        return res.status(404).send({ action: false, message: "stream Not Found" });
    }


    const updated = await streamMaster.update(data, { where: { id: streamMasterId } });

    if (updated) {
        const updatedSection = await streamMaster.findOne({ where: { id: streamMasterId } });
        return res.status(200).send({
            action: true,
            message: "stream updated successfully",
            data: updatedSection
        });
    } else {
        return res.status(400).send({
            action: false,
            message: "Failed to update stream",
            data: null
        });
    }
});



const deleteStreamMaster = asyncHandler(async (req, res) => {
    const streamMasterId = req.params.id;

    if (!streamMasterId) {
        return res.status(400).send({
            action: false,
            message: "streamMasterId is required"
        });
    }
    const [affectedRows] = await streamMaster.update(
        { isDelete: 1 },
        { where: { id: streamMasterId }}
    );

    if (affectedRows > 0) {
        return res.status(200).send({
            action: true,
            message: "Stream successfully marked as deleted!"
        });
    } else {
        return res.status(404).send({
            action: false,
            message: "Stream not found or already deleted!"
        });
    }

});




module.exports = { createStreamMaster, getAllStreamMaster, updateStreamMaster, deleteStreamMaster };





