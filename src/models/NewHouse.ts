import { DataTypes, Model, ModelOptions, Sequelize } from 'sequelize';

export interface NewHouseModel {}

export class NewHouse extends Model<NewHouseModel> {}

export default (sequelize: Sequelize, options: ModelOptions) => {
  return NewHouse.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        comment: '自增ID'
      }
    },
    {
      sequelize,
      tableName: 'house_new',
      defaultScope: {
        attributes: {
          exclude: ['update_time']
        }
      },
      ...options
    }
  );
};
