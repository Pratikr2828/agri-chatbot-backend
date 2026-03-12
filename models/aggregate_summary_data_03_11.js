import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class aggregate_summary_data_03_11 extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    rec_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    state_lgd_code: {
      type: DataTypes.STRING,
      allowNull: true
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
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'aggregate_summary_data_03_11',
    schema: 'public',
    timestamps: false
  });
  }
}
