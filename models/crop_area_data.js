import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class crop_area_data extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    rec_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    state_lgd_code: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    district_lgd_code: {
      type: DataTypes.STRING,
      allowNull: true
    },
    sub_district_lgd_code: {
      type: DataTypes.STRING,
      allowNull: true
    },
    village_lgd_code: {
      type: DataTypes.STRING,
      allowNull: true
    },
    season: {
      type: DataTypes.STRING,
      allowNull: true
    },
    season_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    season_start_date: {
      type: DataTypes.STRING,
      allowNull: true
    },
    season_end_date: {
      type: DataTypes.STRING,
      allowNull: true
    },
    crop_code: {
      type: DataTypes.STRING,
      allowNull: true
    },
    crop_name_eng: {
      type: DataTypes.STRING,
      allowNull: true
    },
    irrigation_source: {
      type: DataTypes.STRING,
      allowNull: true
    },
    area_unit: {
      type: DataTypes.STRING,
      allowNull: true
    },
    year: {
      type: DataTypes.STRING,
      allowNull: true
    },
    timestamp: {
      type: DataTypes.STRING,
      allowNull: true
    },
    no_of_plots: {
      type: DataTypes.STRING,
      allowNull: true
    },
    no_of_farmers: {
      type: DataTypes.STRING,
      allowNull: true
    },
    crop_area_closed: {
      type: DataTypes.STRING,
      allowNull: true
    },
    crop_area_approved: {
      type: DataTypes.STRING,
      allowNull: true
    },
    createdat: {
      type: DataTypes.DATE,
      allowNull: true
    },
    updatedat: {
      type: DataTypes.DATE,
      allowNull: true
    },
    reference_id: {
      type: DataTypes.STRING,
      allowNull: true
    },
    record_id: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    is_view: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    }
  }, {
    sequelize,
    tableName: 'crop_area_data',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "crop_area_data_pkey1",
        unique: true,
        fields: [
          { name: "rec_id" },
          { name: "state_lgd_code" },
        ]
      },
      {
        name: "idx_crop_area_data_combined_season_state_year_isview",
        fields: [
          { name: "season" },
          { name: "state_lgd_code" },
          { name: "year" },
          { name: "village_lgd_code" },
          { name: "is_view" },
        ]
      },
      {
        name: "idx_crop_area_data_is_view",
        fields: [
          { name: "is_view" },
        ]
      },
      {
        name: "idx_crop_area_data_season",
        fields: [
          { name: "season" },
        ]
      },
      {
        name: "idx_crop_area_data_state_lgd_code",
        fields: [
          { name: "state_lgd_code" },
        ]
      },
      {
        name: "idx_crop_area_data_village_lgd_code",
        fields: [
          { name: "village_lgd_code" },
        ]
      },
      {
        name: "idx_crop_area_data_year",
        fields: [
          { name: "year" },
        ]
      },
      {
        name: "idx_cultivated_summary_data_crop_code",
        fields: [
          { name: "crop_code" },
        ]
      },
      {
        name: "idx_cultivated_summary_data_district_lgd_code",
        fields: [
          { name: "district_lgd_code" },
        ]
      },
    ]
  });
  }
}
