import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class adm_user extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    admin_id: {
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
    first_name: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    last_name: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    email_id: {
      type: DataTypes.STRING(150),
      allowNull: true
    },
    mobile_no: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    login_name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    login_pass: {
      type: DataTypes.STRING(4000),
      allowNull: true
    },
    is_master: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    is_enabled: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: true
    },
    is_deleted: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    added_by: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    modify_by: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    added_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    modify_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'adm_role',
        key: 'role_id'
      }
    },
    is_activated: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    activate_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    account_id: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    state_lgd_code: {
      type: DataTypes.BIGINT,
      allowNull: true,
      defaultValue: 0
    },
    state_lgd_code_multi: {
      type: DataTypes.ARRAY(DataTypes.BIGINT),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'adm_user',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "adm_user_pkey",
        unique: true,
        fields: [
          { name: "admin_id" },
        ]
      },
      {
        name: "fki_adm_user_role_fkey",
        fields: [
          { name: "role_id" },
        ]
      },
    ]
  });
  }
}
