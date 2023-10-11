import { Dialect, Sequelize } from 'sequelize';

import EnvVars from '@src/constants/EnvVars';
import logger from 'jet-logger';

import createCity from './City';

create();

async function create() {
  const modelDefiners = [createCity];

  const {
    SEQUELIZE_DATABASE,
    SEQUELIZE_DATABASE_USERNAME,
    SEQUELIZE_DATABASE_PASSWORD,
    SEQUELIZE_DATABASE_HOST,
    SEQUELIZE_DIALECT
  } = EnvVars;

  const sequelize = new Sequelize(
    SEQUELIZE_DATABASE as string,
    SEQUELIZE_DATABASE_USERNAME as string,
    SEQUELIZE_DATABASE_PASSWORD as string,
    {
      host: SEQUELIZE_DATABASE_HOST as string,
      dialect: SEQUELIZE_DIALECT as Dialect,
      timezone: '+08:00'
    }
  );

  modelDefiners.forEach(model =>
    model(sequelize, {
      underscored: true,
      timestamps: true,
      createdAt: 'create_time',
      updatedAt: 'update_time'
    })
  );

  await sequelize.authenticate();
  // await sequelize.sync({ force: true });
  // await sequelize.sync({ alter: true });
  await sequelize.sync();

  logger.info('connection success');
}
