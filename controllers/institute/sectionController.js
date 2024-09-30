
const { Op } = require("sequelize");
const asyncHandler = require("../../utils/asyncHandler");
const db = require("../../models/institute");
let sectionMaster = db.sectionMaster;


const createSectionMaster = asyncHandler(async(req, res) => {
  
    let {name,type="self"} = req.body

    if (!name) {
        return res.status(400).send({ action: false, message: "Name is required" });
    }
    const instituteId = req.instituteToken.instituteId;
    const userId = req.userToken.instituteId;
      
    if (!instituteId) {
        return res.status(400).send({ action: false, message: "InstituteId is required" });
    }
 
    const sectionMasterData = await sectionMaster.create({
        name,
        type,
        instituteId: instituteId,
        userId: userId

    })

    // console.log(sectionMasterData)
     res.status(201).send({ action: true, message: "section master created successfully", data: sectionMasterData });
});


const getAllSectionMaster = asyncHandler(async(req, res) => {
    
    let getAllSectionMaster = await db.sectionMaster.findAll({where:{isDelete: 0}});

    return res.status(200).send({ action: true, message: "listing", data: getAllSectionMaster });
  
});


const updateSectionMaster = asyncHandler(async(req, res) => {
    const sectionMasterId = req.params.id;
    const data = req.body;

    // console.log(data);
    let checkId= await sectionMaster.findByPk(sectionMasterId)
    if( !checkId){
        return res.status(404).send({ action: false, message: "section Not Found" });
    }


    const updated = await sectionMaster.update(data, { where: { id: sectionMasterId } });

    if (updated) {
        const updatedSection = await sectionMaster.findOne({ where: { id: sectionMasterId } });
        return res.status(200).send({
            action: true,
            message: "section updated successfully",
            data: updatedSection
        });
    } else {
        return res.status(400).send({
            action: false,
            message: "Failed to update section",
            data: null
        });
    }
});



const deleteSectionMaster = asyncHandler(async (req, res) => {
    const sectionMasterId = req.params.id;

    if (!sectionMasterId) {
        return res.status(400).send({
            action: false,
            message: "sectionMasterId is required"
        });
    }

    const [affectedRows] = await sectionMaster.update(
        { isDelete: 1 }, 
        { where: { id: sectionMasterId } }
    );

    if (affectedRows > 0) {
        return res.status(200).send({
            action: true,
            message: "Section deleted successfully!"
        });
    } else {
        return res.status(404).send({
            action: false,
            message: "Section not found!"
        });
    }
});




module.exports = { createSectionMaster, getAllSectionMaster, updateSectionMaster, deleteSectionMaster };





