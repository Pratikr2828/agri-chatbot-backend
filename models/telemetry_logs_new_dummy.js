import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class telemetry_logs_new_dummy extends Model {
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
      allowNull: true
    },
    user_type: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    client_participant_id: {
      type: DataTypes.UUID,
      allowNull: true
    },
    server_participant_id: {
      type: DataTypes.UUID,
      allowNull: true
    },
    telemetry_id: {
      type: DataTypes.UUID,
      allowNull: true
    },
    api_endpoint: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    request_timestamp: {
      type: DataTypes.DATE,
      allowNull: true
    },
    mapper_id: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    response_type: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    response_status: {
      type: DataTypes.TEXT,
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
    response_timestamp: {
      type: DataTypes.DATE,
      allowNull: true
    },
    data_size: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    output_validity: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    token_validity: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    api_latency: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    telemetry_added_date: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    client_ip: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    added_date: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    client_participant_name: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    server_participant_name: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    state_lgd_code: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'telemetry_logs_new_dummy',
    schema: 'citus',
    timestamps: false,
    indexes: [
      {
        name: "telemetry_logs_new_dummy_pkey",
        unique: true,
        fields: [
          { name: "log_id" },
        ]
      },
    ]
  });
  }
}
