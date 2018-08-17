


module.exports = (sequelize, DataTypes) => {
  const Notification = sequelize.define('Event', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true, // Automatically gets converted to SERIAL for postgres
      allowNull: false
    },
    name: DataTypes.STRING,
    startTime: DataTypes.DATE,
    endTime : DataTypes.DATE,
    location: DataTypes.STRING,
    data: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  });

  return Notification;
};

