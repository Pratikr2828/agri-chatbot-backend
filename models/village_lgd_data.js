import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class village_lgd_data extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    village_lgd_code: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    village_name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    district_lgd_code: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'district_lgd_data',
        key: 'district_lgd_code'
      }
    },
    state_lgd_code: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'state_lgd_data',
        key: 'state_lgd_code'
      }
    },
    sub_district_lgd_code: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'sub_districts_lgd_data',
        key: 'sub_district_lgd_code'
      }
    }
  }, {
    sequelize,
    tableName: 'village_lgd_data',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "idx_village_lgd_data_village_lgd_code",
        fields: [
          { name: "village_lgd_code" },
        ]
      },
      {
        name: "village_lgd_data_pkey",
        unique: true,
        fields: [
          { name: "village_lgd_code" },
        ]
      },
    ]
  });
  }
}
