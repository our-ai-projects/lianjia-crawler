import { DataTypes, Model, ModelOptions, Sequelize } from 'sequelize';

export interface CityModel {
  group: string;
  href: string;
  zh_name: string;
  en_name: string;
}

export class City extends Model<CityModel> {}

export default (sequelize: Sequelize, options: ModelOptions) => {
  return City.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        comment: '自增ID'
      },
      group: {
        type: DataTypes.STRING,
        comment: '城市分组'
      },
      href: {
        type: DataTypes.STRING,
        comment: '城市链接'
      },
      zh_name: {
        type: DataTypes.STRING,
        comment: '中文名称'
      },
      en_name: {
        type: DataTypes.STRING,
        comment: '英文名称'
      }
    },
    {
      sequelize,
      tableName: 'lianjia_crawler_city',
      defaultScope: {
        attributes: {
          exclude: ['update_time']
        }
      },
      ...options
    }
  );
};
