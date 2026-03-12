import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class chunk extends Model {
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
    attr_num: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    chunk_group_num: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    minimum_value: {
      type: DataTypes.BLOB,
      allowNull: true
    },
    maximum_value: {
      type: DataTypes.BLOB,
      allowNull: true
    },
    value_stream_offset: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    value_stream_length: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    exists_stream_offset: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    exists_stream_length: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    value_compression_type: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    value_compression_level: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    value_decompressed_length: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    value_count: {
      type: DataTypes.BIGINT,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'chunk',
    schema: 'columnar_internal',
    timestamps: false,
    indexes: [
      {
        name: "chunk_pkey",
        unique: true,
        fields: [
          { name: "storage_id" },
          { name: "stripe_num" },
          { name: "attr_num" },
          { name: "chunk_group_num" },
        ]
      },
    ]
  });
  }
}
