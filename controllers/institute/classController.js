
const { Op, where } = require("sequelize");
const asyncHandler = require("../../utils/asyncHandler");
const db = require("../../models/institute");
let classMaster = db.classMaster;


const createClassMaster = asyncHandler(async(req, res) => {
  
    let {name,type="self"} = req.body

    if (!name) {
        return res.status(400).send({ action: false, message: "Name is required" });
    }
    const instituteId = req.instituteToken.instituteId;
    const userId = req.userToken.instituteId;
      
    if (!instituteId) {
        return res.status(400).send({ action: false, message: "InstituteId is required" });
    }
 
    const classMasterData = await classMaster.create({
        name,
        type,
        instituteId: instituteId,
        userId: userId

    })

    // console.log(classMasterData)
     res.status(201).send({ action: true, message: "Class master created successfully", data: classMasterData });
});


const getAllClassMaster = asyncHandler(async(req, res) => {

    
    let getAllClassMaster = await db.classMaster.findAll({where:{isDelete: 0}});

    return res.status(200).send({ action: true, message: "listing", data: getAllClassMaster });
  
});


const updateClassMaster = asyncHandler(async(req, res) => {
    const classMasterId = req.params.id;
    const data = req.body;

    // console.log(data);
    let checkId= await classMaster.findByPk(classMasterId)
    if( !checkId){
        return res.status(404).send({ action: false, message: "class Not Found" });
    }


    const updated = await classMaster.update(data, { where: { id: classMasterId } });

    if (updated) {
        const updatedSchool = await classMaster.findOne({ where: { id: classMasterId } });
        return res.status(200).send({
            action: true,
            message: "class updated successfully",
            data: updatedSchool
        });
    } else {
        return res.status(400).send({
            action: false,
            message: "Failed to update class",
            data: null
        });
    }
});



const deleteClassMaster = asyncHandler(async (req, res) => {
    const classMasterId = req.params.id;

    if (!classMasterId) {
        return res.status(400).send({ action: false, message: "classMasterId is required" });
    }

    const [affectedRows] = await classMaster.update(
        { isDelete: 1 },
        { where: { id: classMasterId } }
    );

    if (affectedRows > 0) {
        return res.status(200).send({
            action: true,
            message: "Class deleted successfully!"
        });
    } else {
        return res.status(404).send({
            action: false,
            message: "Class not found!"
        });
    }
});




module.exports = { createClassMaster, getAllClassMaster, updateClassMaster, deleteClassMaster };





