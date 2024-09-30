
module.exports = (sequelize, DataTypes) => {

    const model = sequelize.define("institute", {
        schoolName: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        schoolEmail: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        schoolContact: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        contact: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        address: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        regNo: {
            type: DataTypes.INTEGER,
            unique: true,
            allowNull: false
        },
        state: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        district: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        planMasterId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        studentCount: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        isActive: {
            type: DataTypes.ENUM('true', 'false'),
            allowNull: false
        },
        isUpdate: {
            type: DataTypes.ENUM('true', 'false'),
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        authCode: {
            type: DataTypes.STRING,
            allowNull: false
        },
        contactPersonName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false
        },
        logo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        expDate: {
            type: DataTypes.DATE,
            allowNull: false
        },
        adminUserId: {
            type: DataTypes.INTEGER,
            unique: true,
            allowNull: false
        },

    });

    return model;

}




