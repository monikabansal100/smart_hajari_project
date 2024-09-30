
module.exports = (sequelize, DataTypes) => {

  const model = sequelize.define("session_master", {
    startDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    sessionName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    isActive: {
      type: DataTypes.ENUM('true', 'false'),
      allowNull: false
    },
    isDelete: {
      type: DataTypes.TINYINT,
      defaultValue: 0,
    },
    instituteId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

  });

  return model;

}




