import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class adm_role extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    role_id: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    unique_id: {
      type: DataTypes.UUID,
      allowNull: true,
      defaultValue: DataTypes.UUIDV4
    },
    role_name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    role_level: {
      type: DataTypes.INTEGER,
      allowNull: true
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
    is_editable: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: true
    },
    checker_maker: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
      comment: "0 - Not Applicable\n1 - maker\n2 - checker"
    }
  }, {
    sequelize,
    tableName: 'adm_role',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "adm_role_pkey",
        unique: true,
        fields: [
          { name: "role_id" },
        ]
      },
    ]
  });
  }
}
