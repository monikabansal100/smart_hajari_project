
// dbConnection.js
const { Sequelize, DataTypes } = require('sequelize');
const dbConfig = require('../../config/dbConfig.js');
const studentModel = require('./studentMaster.js');



const sequelize = new Sequelize(
    dbConfig.DATABASE,
    dbConfig.USER,
    dbConfig.PASSWORD, {
    logging: false,
    host: dbConfig.HOST,
    dialect: dbConfig.DIALECT,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
}
)


sequelize.authenticate()
    .then(() => {
        console.log('Admin connected..')
    })
    .catch(err => {
        console.log('Error' + err)
    })


const db = {}
db.sequelize = sequelize



db.UserInstituteModel= require("./instituteUser.js")(sequelize, DataTypes)
db.classMaster= require("./classMaster.js")(sequelize, DataTypes)
db.streamMaster= require("./streamMaster.js")(sequelize, DataTypes)
db.sectionMaster= require("./sectionMaster.js")(sequelize, DataTypes)
db.sessionMaster= require("./sessionMaster.js")(sequelize, DataTypes)
db.studentModel= require("./studentMaster.js")(sequelize, DataTypes)
db.promotionModel= require("./promotion.js")(sequelize, DataTypes)
db.attendenceModel= require("./attendenceModel.js")(sequelize, DataTypes)
db.holidayList= require("./holidayList.js")(sequelize, DataTypes)
db.holiday= require("./holiday.js")(sequelize, DataTypes)



db.promotionModel.belongsTo(db.classMaster, { foreignKey: 'classMasterId' });

db.promotionModel.belongsTo(db.sectionMaster, { foreignKey: 'sectionMasterId' });

db.promotionModel.belongsTo(db.sessionMaster, { foreignKey: 'sessionMasterId' });

db.promotionModel.belongsTo(db.streamMaster, { foreignKey: 'streamMasterId' });


//==========================================================================


db.studentModel.hasOne(db.promotionModel, { foreignKey: 'studentMasterId' });
db.promotionModel.belongsTo(db.studentModel, { foreignKey: 'studentMasterId' });

db.attendenceModel.hasMany(db.promotionModel, { foreignKey: 'studentMasterId' });
db.promotionModel.belongsTo(db.attendenceModel, { foreignKey: 'studentMasterId' });



//==============================================================================

// studentModel.js
db.studentModel.hasMany(db.promotionModel, { foreignKey: 'studentMasterId' });
db.studentModel.hasMany(db.attendenceModel, { foreignKey: 'studentMasterId' });

// promotionModel.js
db.promotionModel.belongsTo(db.studentModel, { foreignKey: 'studentMasterId' });
db.promotionModel.hasMany(db.attendenceModel, { foreignKey: 'promotionId' });

// attendanceModel.js
db.attendenceModel.belongsTo(db.studentModel, { foreignKey: 'studentMasterId' });
db.attendenceModel.belongsTo(db.promotionModel, { foreignKey: 'promotionId' });








// Sync models with the database
db.sequelize.sync({ force: false }).then(() => {
    console.log('Connection has been established successfully');
}).catch(err => {
    console.error('Unable to connect to the database:', err);
});


module.exports = db


