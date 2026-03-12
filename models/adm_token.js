import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class adm_token extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    token_id: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    unique_id: {
      type: DataTypes.UUID,
      allowNull: true,
      defaultValue: DataTypes.UUIDV4
    },
    admin_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'adm_user',
        key: 'admin_id'
      }
    },
    ip_address: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    user_agent: {
      type: DataTypes.STRING(2500),
      allowNull: true
    },
    added_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    last_action: {
      type: DataTypes.DATE,
      allowNull: true
    },
    is_logout: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    logout_time: {
      type: DataTypes.DATE,
      allowNull: true
    },
    device_name: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    ip_location: {
      type: DataTypes.STRING(100),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'adm_token',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "adm_auth_token_pkey",
        unique: true,
        fields: [
          { name: "token_id" },
        ]
      },
      {
        name: "fki_adm_auth_token_fkey",
        fields: [
          { name: "admin_id" },
        ]
      },
    ]
  });
  }
}
