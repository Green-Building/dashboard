module.exports = (sequelize, DataTypes) => {
  let Node = sequelize.define('node', {
    id: {
      allowNull: false,
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
    },
    series_number: {
      type: DataTypes.STRING,
    },
    install_time: {
      type: DataTypes.DATE,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    timestamps: false,
    freezeTableName: true,
    tableName: 'node',
    // Creating a custom method for our User model. This will check if an unhashed password entered by
    // The user can be compared to the hashed password stored in our database
    classMethods: {
      associate: function(models) {
        Node.belongsTo(models.cluster, {
          foreignKey: 'cluster_id',
          allowNull: false,
        });
        Node.belongsTo(models.room, {
          foreignKey: 'room_id',
          allowNull: false,
        });
        Node.hasMany(models.sensor, {
          foreignKey: 'node_id',
        });
      },
    },
  });
  return Node;
}