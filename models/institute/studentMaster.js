
module.exports = (sequelize, DataTypes) => {

    const model = sequelize.define("student_master", {
        studentName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        contact: {
            type: DataTypes.STRING,
            allowNull: false
        },
        alternateContact: {
            type: DataTypes.STRING,
            allowNull: false
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false
        },
        status: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
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
        fathersName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        mothersName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        deviceId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        photo: {
            type: DataTypes.STRING,
            defaultValue: 'assets/student_default_image.png',
            allowNull: false
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




