import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class aiu_data extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.BIGINT,
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
    get_token_ts: {
      type: DataTypes.DATE,
      allowNull: true
    },
    get_token_status: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    token_failure_reason: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    seek_ts: {
      type: DataTypes.DATE,
      allowNull: true
    },
    mapper_id: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    consent_required: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    consent_artifact_ts: {
      type: DataTypes.DATE,
      allowNull: true
    },
    seek_ack_ts: {
      type: DataTypes.DATE,
      allowNull: true
    },
    seek_ack_status: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    seek_error_reason: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    receipt_timestamp: {
      type: DataTypes.DATE,
      allowNull: true
    },
    receipt_data_size: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    receipt_token_valid: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    receipt_token_failure_reason: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    receipt_data_validity: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'aiu_data',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "aiu_data_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
