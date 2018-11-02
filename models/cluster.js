module.exports = (sequelize, DataTypes) => {
  let Cluster = sequelize.define('cluster', {
    id: {
      allowNull: false,
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },
    floor: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    timestamps: false,
    freezeTableName: true,
    tableName: 'cluster',
    // Creating a custom method for our User model. This will check if an unhashed password entered by
    // The user can be compared to the hashed password stored in our database
    classMethods: {
      associate: function(models) {
        Cluster.belongsTo(models.building, {
          foreignKey: 'building_id',
          allowNull: false,
        });
      },
    },
  });
  return Cluster;
}