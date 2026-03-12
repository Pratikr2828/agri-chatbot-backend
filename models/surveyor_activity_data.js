import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class surveyor_activity_data extends Model {
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
    count_of_active_surveyors: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    count_of_surveyors: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    surveyor_department: {
      type: DataTypes.STRING,
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
    tableName: 'surveyor_activity_data',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "surveyor_activity_data_pkey1",
        unique: true,
        fields: [
          { name: "rec_id" },
          { name: "state_lgd_code" },
        ]
      },
    ]
  });
  }
}
