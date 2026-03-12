import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class cultivated_summary_data extends Model {
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
    area_unit: {
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
    year: {
      type: DataTypes.STRING,
      allowNull: true
    },
    timestamp: {
      type: DataTypes.STRING,
      allowNull: true
    },
    total_surveyed_plots: {
      type: DataTypes.STRING,
      allowNull: true
    },
    total_surveyable_area: {
      type: DataTypes.STRING,
      allowNull: true
    },
    total_surveyed_area: {
      type: DataTypes.STRING,
      allowNull: true
    },
    total_na_area: {
      type: DataTypes.STRING,
      allowNull: true
    },
    total_fallow_area: {
      type: DataTypes.STRING,
      allowNull: true
    },
    total_harvested_area: {
      type: DataTypes.STRING,
      allowNull: true
    },
    total_irrigated_area: {
      type: DataTypes.STRING,
      allowNull: true
    },
    total_perennial_crop_area: {
      type: DataTypes.STRING,
      allowNull: true
    },
    total_biennial_crop_area: {
      type: DataTypes.STRING,
      allowNull: true
    },
    total_seasonal_crop_area: {
      type: DataTypes.STRING,
      allowNull: true
    },
    total_unirrigated_area: {
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
    tableName: 'cultivated_summary_data',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "cultivated_summary_data_pkey1",
        unique: true,
        fields: [
          { name: "rec_id" },
          { name: "state_lgd_code" },
        ]
      },
      {
        name: "idx_cultivated_summary_data",
        fields: [
          { name: "state_lgd_code" },
          { name: "district_lgd_code" },
          { name: "sub_district_lgd_code" },
          { name: "village_lgd_code" },
          { name: "season" },
        ]
      },
      {
        name: "idx_cultivated_summary_data_is_view",
        fields: [
          { name: "is_view" },
        ]
      },
      {
        name: "idx_cultivated_summary_data_season",
        fields: [
          { name: "season" },
        ]
      },
      {
        name: "idx_cultivated_summary_data_state_lgd_code",
        fields: [
          { name: "state_lgd_code" },
        ]
      },
      {
        name: "idx_cultivated_summary_data_sub_district_lgd_code",
        fields: [
          { name: "sub_district_lgd_code" },
        ]
      },
      {
        name: "idx_cultivated_summary_data_village_lgd_code",
        fields: [
          { name: "village_lgd_code" },
        ]
      },
      {
        name: "idx_cultivated_summary_data_year",
        fields: [
          { name: "year" },
        ]
      },
      {
        name: "ind_district_lgd_code",
        fields: [
          { name: "district_lgd_code" },
        ]
      },
    ]
  });
  }
}
