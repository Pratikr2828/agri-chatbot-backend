import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class crop_area_data_25_10_citus extends Model {
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
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'crop_area_data_25_10_citus',
    schema: 'public',
    timestamps: false
  });
  }
}
