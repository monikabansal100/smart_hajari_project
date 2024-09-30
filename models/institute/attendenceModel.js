
module.exports = (sequelize, DataTypes) => {

    const model = sequelize.define("attendence", {
        admissionNo: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        promotionid: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        deviceLogId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        to: {     
            type: DataTypes.STRING,
            // allowNull: false
        },
        subject: {
            type: DataTypes.STRING,
            // allowNull: false
        },
        text: {
            type: DataTypes.STRING,
            // allowNull: false
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        direction: {
            type: DataTypes.ENUM('In', 'Out'),
            allowNull: false,
            defaultValue: 'In'
        },
        isPresent: {
            type: DataTypes.INTEGER,
            allowNull: false,
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
        ismail: {
            type: DataTypes.TINYINT,
            defaultValue: 0,
        },
        IsSms: {
            type: DataTypes.TINYINT,
            defaultValue: 0,
        },

    });

    return model;
}




// Admissionid
// Promotionid
// Date
// Classmasterid
// Streammasterid
// Sectionmasterid
// Direction - In/Out
// Ismail-0
// IsSms-0



// {
//     "to": "bansalmonika143@gmail.com",
//     "admissionid": 6,
//     "promotionid": 2,
//     "subject": "student attendence updation",
//     "text": "student is present",
//     "date": "2024-09-09",
//     "classMasterId": 4,
//     "streamMasterId": 5,
//     "sectionMasterId": 3,
//     "studentMasterId": 2
// }
