import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class chunk_group extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    storage_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    stripe_num: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    chunk_group_num: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    row_count: {
      type: DataTypes.BIGINT,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'chunk_group',
    schema: 'columnar_internal',
    timestamps: false,
    indexes: [
      {
        name: "chunk_group_pkey",
        unique: true,
        fields: [
          { name: "storage_id" },
          { name: "stripe_num" },
          { name: "chunk_group_num" },
        ]
      },
    ]
  });
  }
}
