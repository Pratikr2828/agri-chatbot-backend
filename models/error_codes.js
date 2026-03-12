import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class error_codes extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    error_code: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    error_description: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'error_codes',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "error_code_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
