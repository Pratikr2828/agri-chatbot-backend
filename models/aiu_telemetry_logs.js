import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class aiu_telemetry_logs extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    aiu_id: {
      type: DataTypes.UUID,
      allowNull: true
    },
    aip_id: {
      type: DataTypes.UUID,
      allowNull: true
    },
    reference_id: {
      type: DataTypes.UUID,
      allowNull: true
    },
    request_timestamp: {
      type: DataTypes.STRING(50),
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
    response_timestamp: {
      type: DataTypes.STRING(50),
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
      type: DataTypes.STRING(50),
      allowNull: true
    },
    receipt_reference_timestamp: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'aiu_telemetry_logs',
    schema: 'citus',
    timestamps: true,
    indexes: [
      {
        name: "aiu_telemetry_logs_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
