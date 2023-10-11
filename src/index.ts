import './pre-start'; // Must be the first import
import logger from 'jet-logger';

import EnvVars from '@src/constants/EnvVars';

import './models/sync';
import './services/city';

console.log(EnvVars.NodeEnv, EnvVars.SEQUELIZE_DATABASE);

process.on('exit', async err => {
  logger.err(`exit ${err} `);
});
process.on('SIGINT', async err => {
  logger.err(`SIGINT ${err} `);
});
