import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class distributed_table extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'distributed_table',
    schema: 'public',
    timestamps: false
  });
  }
}
