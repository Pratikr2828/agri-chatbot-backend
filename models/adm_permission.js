import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class adm_permission extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    permission_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    menu_name: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    has_submenu: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    parent_id: {
      type: DataTypes.BIGINT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'adm_permission',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "adm_permission_pkey",
        unique: true,
        fields: [
          { name: "permission_id" },
        ]
      },
    ]
  });
  }
}
