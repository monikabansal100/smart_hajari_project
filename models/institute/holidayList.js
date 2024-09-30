
module.exports = (sequelize, DataTypes) => {

    const model = sequelize.define("holidayList", {
        title: {
            type: DataTypes.STRING,
            // allowNull: false
        },
        startDate: {
            type: DataTypes.DATE,
            allowNull: false
        },
        endDate: {
            type: DataTypes.DATE,
            allowNull: false
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        days: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        sessionMasterId: {
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