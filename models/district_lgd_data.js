import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class district_lgd_data extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    district_lgd_code: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    district_name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    state_lgd_code: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'state_lgd_data',
        key: 'state_lgd_code'
      }
    }
  }, {
    sequelize,
    tableName: 'district_lgd_data',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "district_lgd_data_pkey",
        unique: true,
        fields: [
          { name: "district_lgd_code" },
        ]
      },
      {
        name: "idx_district_lgd_data_district_lgd_code",
        fields: [
          { name: "district_lgd_code" },
        ]
      },
    ]
  });
  }
}
