import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class mv_refresh_log extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    state_lgd_code: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    season: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    year: {
      type: DataTypes.STRING,
      allowNull: false
    },
    no_of_records: {
      type: DataTypes.BIGINT,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'mv_refresh_log',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "mv_refresh_log_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
