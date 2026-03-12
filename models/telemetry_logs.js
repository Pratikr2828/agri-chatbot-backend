import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class telemetry_logs extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    log_id: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    unique_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    user_type: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    aip_id: {
      type: DataTypes.UUID,
      allowNull: true
    },
    aiu_id: {
      type: DataTypes.UUID,
      allowNull: true
    },
    trans_id: {
      type: DataTypes.UUID,
      allowNull: true
    },
    api_name: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    state_lgd_code: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    mapper_id: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    response_type: {
      type: DataTypes.ENUM("DATA","ERROR","ACK"),
      allowNull: true
    },
    response_status: {
      type: DataTypes.ENUM("success","failure"),
      allowNull: true
    },
    response_status_code: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    failure_reason: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    request_timestamp: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    response_timestamp: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    data_size: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    receipt_reference_data_validity: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    receipt_reference_token_valid: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    consent_required: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    consent_artifact_timestamp: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    receipt_reference_timestamp: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    api_latency: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    response_time_ms: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    method: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    added_date: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    telemetry_added_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    aiu_name: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    aip_name: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'telemetry_logs',
    schema: 'citus',
    timestamps: false,
    indexes: [
      {
        name: "telemetry_logs_pkey",
        unique: true,
        fields: [
          { name: "log_id" },
        ]
      },
    ]
  });
  }
}
