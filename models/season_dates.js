import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class season_dates extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    season: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    fromdate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    todate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    priority: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    year: {
      type: DataTypes.STRING(9),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'season_dates',
    schema: 'public',
    timestamps: false
  });
  }
}
