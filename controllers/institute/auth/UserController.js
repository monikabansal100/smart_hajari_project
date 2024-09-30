const { Op } = require("sequelize");
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken');
const db = require("../../../models/admin/index")

// const UserInstituteModel = db.UserInstituteModel
const InstituteModel = db.InstituteModel
const asyncHandler = require("../../../utils/asyncHandler")




const login = asyncHandler(async (req, res) => {
    const { contact, password } = req.body;
    const user = await InstituteModel.findOne({where: {contact}});
    // console.log(user);
    
    if (!user) {
        return res.status(404).send({ action: false, message: "Contact number not found" });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
        return res.status(400).send({ action: false, message: "Invalid password" });
    }

    const token = jwt.sign({ instituteId: user.id, name: user.name }, process.env.JWT_SECRET);
    console.log(token);
    

    res.cookie('instituteToken', token, {
        httpOnly: true,
        secure: true,
        maxAge: 24 * 60 * 60 * 1000  // Cookie expires in 1 day
    });

    return res.status(200).send({ token, message: "Token has been sent" });
});




module.exports = {login};
















