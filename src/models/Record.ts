import { DataTypes, Model, ModelOptions, Sequelize } from 'sequelize';

export interface RecordModel {
  type: number;
  batch: string;
  record: string;
}

export class Record extends Model<RecordModel> { }

export default (sequelize: Sequelize, options: ModelOptions) => {
  return Record.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        comment: '自增ID'
      },
      type: {
        type: DataTypes.TINYINT,
        comment: '抓取任务类型 1-二手房、2-新房、3-租房',
        validate: {
          isIn: [[1, 2, 3]]
        }
      },
      batch: {
        type: DataTypes.STRING,
        comment: '抓取批次'
      },
      record: {
        type: DataTypes.TEXT,
        comment: '城市抓取记录 tj,changzhou'
      }
    },
    {
      sequelize,
      tableName: 'record',
      defaultScope: {
        attributes: {
          exclude: ['update_time']
        }
      },
      ...options
    }
  );
};
