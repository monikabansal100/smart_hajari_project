
module.exports = (sequelize, DataTypes) => {

  const model = sequelize.define("class_master", {
    name: {
      type: DataTypes.INTEGER,
      unique: true,
      allowNull: false
    },
    type: {
      type: DataTypes.ENUM('common', 'self'),
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




