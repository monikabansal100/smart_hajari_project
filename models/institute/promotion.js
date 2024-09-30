
module.exports = (sequelize, DataTypes) => {

    const model = sequelize.define("promotion", {
        admissionNo: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        admissionDate: {
            type: DataTypes.DATE,
            allowNull: false
        },
        srNo: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        classMasterId: {
            type: DataTypes.INTEGER,       
        },
        streamMasterId: {
            type: DataTypes.INTEGER,
        },
        sectionMasterId: {
            type: DataTypes.INTEGER,
        },
        sessionMasterId: {
            type: DataTypes.INTEGER,
        },
        studentMasterId: {
            type: DataTypes.INTEGER,
        },
        deviceId: {
            type: DataTypes.STRING,
        },
        instituteId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        isDelete: {
            type: DataTypes.TINYINT,
            defaultValue: 0,
        },

    });

    return model;
}




