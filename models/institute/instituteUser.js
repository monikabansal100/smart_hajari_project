
module.exports = (sequelize, DataTypes) => {

    const model = sequelize.define("Institute_user", {
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
        isActive: {
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
        instituteId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },


    });

    return model;

}




