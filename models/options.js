import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class options extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    regclass: {
      type: "REGCLASS",
      allowNull: false,
      primaryKey: true
    },
    chunk_group_row_limit: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    stripe_row_limit: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    compression_level: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    compression: {
      type: "NAME",
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'options',
    schema: 'columnar_internal',
    timestamps: false,
    indexes: [
      {
        name: "options_pkey",
        unique: true,
        fields: [
          { name: "regclass" },
        ]
      },
    ]
  });
  }
}
