import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class season extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(99),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'season',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "season_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
