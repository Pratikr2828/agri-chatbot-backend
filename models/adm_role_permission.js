import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class adm_role_permission extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    role_id: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    permission_id: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    is_allowed: {
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
    }
  }, {
    sequelize,
    tableName: 'adm_role_permission',
    schema: 'public',
    timestamps: false
  });
  }
}
