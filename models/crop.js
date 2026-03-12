import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class crop extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    crop_code: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    name: {
      type: DataTypes.STRING(99),
      allowNull: true
    },
    crop_type: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    scientific_name_of_crop: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    crop_category: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    hindi_name_of_crop: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    vn_of_crop_in_english_by_assam: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    vn_of_crop_in_local_by_assam: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    vn_of_crop_in_english_by_andhra_pradesh: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    vn_of_crop_in_local_by_andhra_pradesh: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    vn_of_crop_in_english_by_gujarat: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    vn_of_crop_in_local_by_gujarat: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    vn_of_crop_in_english_by_karnataka: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    vn_of_crop_in_local_by_karnataka: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    vn_of_crop_in_english_by_kerala: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    vn_of_crop_in_local_by_kerala: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    vn_of_crop_in_english_by_madhya_pradesh: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    vn_of_crop_in_local_by_madhya_pradesh: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    vn_of_crop_in_english_by_maharashtra: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    vn_of_crop_in_local_by_maharashtra: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    vn_of_crop_in_english_by_odisha: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    vn_of_crop_in_local_by_odisha: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    vn_of_crop_in_english_by_rajasthan: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    vn_of_crop_in_local_by_rajasthan: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    vn_of_crop_in_english_by_tamilnadu: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    vn_of_crop_in_local_by_tamilnadu: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    vn_of_crop_in_english_by_telangana: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    vn_of_crop_in_local_by_telangana: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    vn_of_crop_in_english_by_uttar_pradesh: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    vn_of_crop_in_local_by_uttar_pradesh: {
      type: DataTypes.STRING(100),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'crop',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "crop_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "idx_crop_crop_code",
        fields: [
          { name: "crop_code" },
        ]
      },
    ]
  });
  }
}
