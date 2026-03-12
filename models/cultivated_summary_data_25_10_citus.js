import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class cultivated_summary_data_25_10_citus extends Model {
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
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'cultivated_summary_data_25_10_citus',
    schema: 'public',
    timestamps: false
  });
  }
}
