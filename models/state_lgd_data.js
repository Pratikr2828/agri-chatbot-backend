import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class state_lgd_data extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    state_lgd_code: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    state_name: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'state_lgd_data',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "state_lgd_data_pkey",
        unique: true,
        fields: [
          { name: "state_lgd_code" },
        ]
      },
    ]
  });
  }
}
