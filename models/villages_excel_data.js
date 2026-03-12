import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class villages_excel_data extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    state_code: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    district_code: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    district_name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    sub_district_code: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    sub_district_name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    village_code: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    village_version: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    village_name_en: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    village_name_local: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    village_category: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    village_status: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    census_2001_code: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    census_2011_code: {
      type: DataTypes.STRING(10),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'villages_excel_data',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "villages_excel_data_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
