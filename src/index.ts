import './pre-start'; // Must be the first import

import logger from 'jet-logger';
import EnvVars from './constants/EnvVars';

import { sync } from './models/sync';
import CityService from './services/CityService';
import LoupanService from './services/LoupanService';

import { CrawlerOptions, CrawlerType } from './typings';

const App = () => {
  const pre = async () => {
    await sync();
    await CityService.run();
  };

  const start = async () => {
    const { CRAWLER_TYPE, CRAWLER_BATCH } = EnvVars;

    if (!CRAWLER_TYPE) {
      logger.err(`missing CRAWLER_TYPE parameter`);
      return;
    }
    if (!CRAWLER_BATCH) {
      logger.err(`missing CRAWLER_BATCH parameter`);
      return;
    }

    await pre();

    const options: CrawlerOptions = {
      type: Number(CRAWLER_TYPE),
      batch: CRAWLER_BATCH
    };

    switch (options.type) {
      case CrawlerType.NEW_HOUSE:
        await LoupanService.run(options);
        break;
      default:
        logger.err(`CRAWLER_TYPE does not exist`);
        break;
    }
  };

  return {
    start
  };
};

App().start();
