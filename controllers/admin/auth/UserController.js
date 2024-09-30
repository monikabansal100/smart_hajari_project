const { Op } = require("sequelize");
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken');
const db = require("../../../models/admin/index")
const asyncHandler = require("../../../utils/asyncHandler")
const UserModel = db.UserModel

const createUser = asyncHandler(async (req, res) => {
    let data = req.body


    // console.log(data);
    let dataHash = await bcrypt.hash(data.password, 10)
    if (!dataHash) return res.status(400).send({ action: false, message: "Cant hash password" })
    data.password = dataHash

    let savedData = await UserModel.create(data)

    return res.status(201).send(savedData);
})


const login = asyncHandler(async (req, res) => {
    let data = req.body
    let { mobileNo, password } = data

    let user = await UserModel.findOne({ where: { mobileNo } });
   
    if (!user) {
        return res.status(404).send({ action: false, message: "mobile number Not found" });
    }

    const validPassword = await bcrypt.compare(password, user.password)
    if (!validPassword) {
        return res.status(400).send({ action: false, message: "you have enter invalid password" })
    }

    let token = jwt.sign({ adminUserId: user.id, name: user.fullName }, process.env.JWT_SECRET);
    // console.log(token);


    res.cookie('adminUserToken', token, {
        httpOnly: true,
        secure: true,
        maxAge: 24 * 60 * 60 * 1000  // Cookie expires in 1 day
    });

    return res.status(200).send({ token: token, msg: "token has been sent" });
})


// const profile = async (req, res) => {
//     let adminUserId = req.userTokenData.adminUserId
//     let adminData = await UserModel.findByPk(adminUserId)
//     return res.status(200).send({ action: true, message: "admin profile", data: adminData });
// }

module.exports = { createUser, login }




