import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class sharied_data_with_upag extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    rec_id: {
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
    crop_code: {
      type: DataTypes.STRING,
      allowNull: true
    },
    crop_name_eng: {
      type: DataTypes.STRING(99),
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
    is_shared: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    }
  }, {
    sequelize,
    tableName: 'sharied_data_with_upag',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "sharied_data_with_upag_pkey",
        unique: true,
        fields: [
          { name: "state_lgd_code" },
          { name: "rec_id" },
        ]
      },
    ]
  });
  }
}
