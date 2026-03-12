import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class stripe extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    storage_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      unique: "stripe_first_row_number_idx"
    },
    stripe_num: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    file_offset: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    data_length: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    column_count: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    chunk_row_count: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    row_count: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    chunk_group_count: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    first_row_number: {
      type: DataTypes.BIGINT,
      allowNull: false,
      unique: "stripe_first_row_number_idx"
    }
  }, {
    sequelize,
    tableName: 'stripe',
    schema: 'columnar_internal',
    timestamps: false,
    indexes: [
      {
        name: "stripe_first_row_number_idx",
        unique: true,
        fields: [
          { name: "storage_id" },
          { name: "first_row_number" },
        ]
      },
      {
        name: "stripe_pkey",
        unique: true,
        fields: [
          { name: "storage_id" },
          { name: "stripe_num" },
        ]
      },
    ]
  });
  }
}
