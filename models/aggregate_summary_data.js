import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class aggregate_summary_data extends Model {
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
    year: {
      type: DataTypes.STRING,
      allowNull: true
    },
    total_plots: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    total_assigned_plots: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    total_no_of_surveyors: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    total_plots_surveyed: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    total_plots_unable_to_survey: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    total_survey_approved: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    total_today_survey: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    total_survey_under_review: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    timestamp: {
      type: DataTypes.STRING(150),
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
    tableName: 'aggregate_summary_data',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "aggregate_summary_data_pkey1",
        unique: true,
        fields: [
          { name: "rec_id" },
          { name: "state_lgd_code" },
        ]
      },
      {
        name: "idx_aggregate_cultivated_join",
        fields: [
          { name: "state_lgd_code" },
          { name: "district_lgd_code" },
          { name: "sub_district_lgd_code" },
          { name: "village_lgd_code" },
          { name: "season" },
          { name: "year" },
        ]
      },
      {
        name: "idx_aggregate_summary_data_district_lgd_code",
        fields: [
          { name: "district_lgd_code" },
        ]
      },
      {
        name: "idx_aggregate_summary_data_season",
        fields: [
          { name: "season" },
        ]
      },
      {
        name: "idx_aggregate_summary_data_state_lgd_code",
        fields: [
          { name: "state_lgd_code" },
        ]
      },
      {
        name: "idx_aggregate_summary_data_sub_district_lgd_code",
        fields: [
          { name: "sub_district_lgd_code" },
        ]
      },
      {
        name: "idx_aggregate_summary_data_village_lgd_code",
        fields: [
          { name: "village_lgd_code" },
        ]
      },
      {
        name: "idx_aggregate_summary_data_year",
        fields: [
          { name: "year" },
        ]
      },
      {
        name: "idx_is_view",
        fields: [
          { name: "is_view" },
        ]
      },
    ]
  });
  }
}
