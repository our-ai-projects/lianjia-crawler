import { DataTypes, Model, ModelOptions, Sequelize } from 'sequelize';

export interface NewHouseModel {
  city_id: string;
  city_name: string;
  cover_pic: string;
  min_frame_area: number;
  max_frame_area: number;
  district_id: string;
  district_name: string;
  bizcircle_name: string;
  bizcircle_id: string;
  resblock_frame_area: string;
  decoration: string;
  longitude: string;
  latitude: string;
  frame_rooms_desc: string;
  title: string;
  resblock_alias: string;
  address: string;
  store_addr: string;
  avg_unit_price: string;
  average_price: string;
  converged_rooms: string;
  tags: string;
  house_type: string;
  sale_status: string;
  open_date: string;
  properright: string;
  developer_company: string;
  property_company: string;
  recommend_data: string;
  app_detail_url: string;
}

export class NewHouse extends Model<NewHouseModel> {
  public static keys = [
    'city_id',
    'city_name',
    'cover_pic',
    'min_frame_area',
    'max_frame_area',
    'district_id',
    'district_name',
    'bizcircle_name',
    'bizcircle_id',
    'resblock_frame_area',
    'decoration',
    'longitude',
    'latitude',
    'frame_rooms_desc',
    'title',
    'resblock_alias',
    'address',
    'store_addr',
    'avg_unit_price',
    'average_price',
    'converged_rooms',
    'tags',
    'house_type',
    'sale_status',
    'open_date',
    'properright',
    'developer_company',
    'property_company',
    'recommend_data',
    'app_detail_url'
  ] as any;

  public static translateData(data: any[], batchId: number) {
    return data.map(item => {
      return NewHouse.keys.reduce(
        (pre: any, k: any) => {
          const v = item[k];
          pre[k] = typeof v === 'string' ? v : JSON.stringify(v);
          return pre;
        },
        { batch_id: batchId } as any
      );
    });
  }
}

export default (sequelize: Sequelize, options: ModelOptions) => {
  return NewHouse.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        comment: '自增ID'
      },
      batch_id: {
        type: DataTypes.INTEGER,
        comment: '抓取批次ID'
      },
      city_id: {
        type: DataTypes.STRING,
        comment: '城市ID'
      },
      city_name: {
        type: DataTypes.STRING,
        comment: '城市名称'
      },
      cover_pic: {
        type: DataTypes.STRING,
        comment: '封面图'
      },
      min_frame_area: {
        type: DataTypes.STRING,
        comment: '最小面积'
      },
      max_frame_area: {
        type: DataTypes.STRING,
        comment: '最大面积'
      },
      district_id: {
        type: DataTypes.STRING,
        comment: '地区ID'
      },
      district_name: {
        type: DataTypes.STRING,
        comment: '地区名称'
      },
      bizcircle_name: {
        type: DataTypes.STRING,
        comment: '街道ID'
      },
      bizcircle_id: {
        type: DataTypes.STRING,
        comment: '街道名称'
      },
      resblock_frame_area: {
        type: DataTypes.STRING,
        comment: '建面'
      },
      decoration: {
        type: DataTypes.STRING,
        comment: '装饰'
      },
      longitude: {
        type: DataTypes.STRING,
        comment: '经度'
      },
      latitude: {
        type: DataTypes.STRING,
        comment: '纬度'
      },
      frame_rooms_desc: {
        type: DataTypes.STRING,
        comment: '户型'
      },
      title: {
        type: DataTypes.STRING,
        comment: '房源名称'
      },
      resblock_alias: {
        type: DataTypes.STRING,
        comment: '房源别名'
      },
      address: {
        type: DataTypes.STRING,
        comment: '地址'
      },
      store_addr: {
        type: DataTypes.STRING,
        comment: '详细地址'
      },
      avg_unit_price: {
        type: DataTypes.STRING,
        comment: '平均单价'
      },
      average_price: {
        type: DataTypes.STRING,
        comment: '平均价格'
      },
      converged_rooms: {
        type: DataTypes.TEXT,
        comment: '房型介绍'
      },
      tags: {
        type: DataTypes.STRING,
        comment: '热门标签'
      },
      house_type: {
        type: DataTypes.STRING,
        comment: '房源类型'
      },
      sale_status: {
        type: DataTypes.STRING,
        comment: '在售状态'
      },
      open_date: {
        type: DataTypes.STRING,
        comment: '开盘时间'
      },
      properright: {
        type: DataTypes.STRING,
        comment: '产权'
      },
      developer_company: {
        type: DataTypes.STRING,
        comment: '房地产公司'
      },
      property_company: {
        type: DataTypes.STRING,
        comment: '物业公司'
      },
      recommend_data: {
        type: DataTypes.TEXT,
        comment: '推荐信息'
      },
      app_detail_url: {
        type: DataTypes.STRING,
        comment: 'app 详情地址'
      }
    },
    {
      sequelize,
      tableName: 'crawler_new_house',
      defaultScope: {
        attributes: {
          exclude: ['update_time']
        }
      },
      ...options
    }
  );
};
