


module.exports = (sequelize, DataTypes) => {
  const Notification = sequelize.define('Notification', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true, // Automatically gets converted to SERIAL for postgres
      allowNull: false
    },
    title: DataTypes.STRING,
    subtitle: DataTypes.BOOLEAN,
    valid : DataTypes.STRING,
    source: DataTypes.STRING,
    data: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  });

  return Notification;
};

