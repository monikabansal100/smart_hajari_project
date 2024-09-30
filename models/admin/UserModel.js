
module.exports = (sequelize, DataTypes) => {

  const model = sequelize.define("admin_user", {
    fullName: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    mobileNo: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    rollMasterId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    isActive: {
      type: DataTypes.ENUM('true', 'false'), 
      allowNull: false
    },
  });

  return model;

}

  
  
  
  