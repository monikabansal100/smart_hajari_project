
// dbConnection.js
const { Sequelize, DataTypes } = require('sequelize');
const dbConfig = require('../../config/dbConfig.js');



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


db.UserModel= require("./UserModel.js")(sequelize, DataTypes)
db.InstituteModel= require("./InstituteModel.js")(sequelize, DataTypes)



// Sync models with the database
db.sequelize.sync({ force: false }).then(() => {
    console.log('Connection has been established successfully');
}).catch(err => {
    console.error('Unable to connect to the database:', err);
});


module.exports = db


