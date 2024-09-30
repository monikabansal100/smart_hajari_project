
const { Op } = require("sequelize");
const asyncHandler = require("../../utils/asyncHandler");
const db = require("../../models/institute");
let sessionMaster = db.sessionMaster;


const createSessionMaster = asyncHandler(async(req, res) => {
  
    let {startDate,endDate,sessionName,isActive,isDelete} = req.body

    const instituteId = req.instituteToken.instituteId;
    const userId = req.userToken.instituteId;
      
    if (!instituteId) {
        return res.status(400).send({ action: false, message: "InstituteId is required" });
    }
 
    const sessionMasterData = await sessionMaster.create({
        startDate,endDate,sessionName,isActive,isDelete,
        instituteId: instituteId,
        userId: userId

    })

    // console.log(sessionMasterData)
     res.status(201).send({ action: true, message: "session master created successfully", data: sessionMasterData });
});


const getAllSessionMaster = asyncHandler(async(req, res) => {
    
    let getAllSessionMaster = await db.sessionMaster.findAll({where:{isDelete: 0}});

    return res.status(200).send({ action: true, message: "listing", data: getAllSessionMaster });
  
});


const updateSessionMaster = asyncHandler(async(req, res) => {
    const sessionMasterId = req.params.id;
    const data = req.body;

    // console.log(data);
    let checkId= await sessionMaster.findByPk(sessionMasterId)
    if( !checkId){
        return res.status(404).send({ action: false, message: "session Not Found" });
    }


    const updated = await sessionMaster.update(data, { where: { id: sessionMasterId } });

    if (updated) {
        const updatedSession = await sessionMaster.findOne({ where: { id: sessionMasterId } });
        return res.status(200).send({
            action: true,
            message: "session updated successfully",
            data: updatedSession
        });
    } else {
        return res.status(400).send({
            action: false,
            message: "Failed to update session",
            data: null
        });
    }
});



const deleteSessionMaster = asyncHandler(async (req, res) => {
    const sessionMasterId = req.params.id;

    if (!sessionMasterId) {
        return res.status(400).send({
            action: false,
            message: "SessionMasterId is required"
        });
    }

    const [affectedRows] = await sessionMaster.update(
        { isDelete: 1 },
        { where: { id: sessionMasterId } }
    );

    if (affectedRows > 0) {
        return res.status(200).send({
            action: true,
            message: "Session deleted successfully"
        });
    } else {
        return res.status(404).send({
            action: false,
            message: "Session not found"
        });
    }
});




module.exports = { createSessionMaster, getAllSessionMaster, updateSessionMaster, deleteSessionMaster };





