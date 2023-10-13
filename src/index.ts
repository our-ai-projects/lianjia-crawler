import './pre-start'; // Must be the first import

import schedule from 'node-schedule';
import logger from 'jet-logger';

import { sync } from './models/sync';
import CityService from './services/CityService';
import LoupanService from './services/LoupanService';

import { CrawlerType } from './typings';
import { getBatch, getEnvVars } from './shared/tools';

const App = () => {
  const { CRAWLER_TYPE, CRAWLER_BATCH, CRAWLER_CRON } = getEnvVars();

  const pre = async () => {
    await sync();
    await CityService.run();
  };

  const start = async (batch: string) => {
    const options = {
      type: Number(CRAWLER_TYPE),
      batch
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

  // https://www.npmjs.com/package/node-schedule
  // ┬    ┬    ┬    ┬    ┬    ┬
  // │    │    │    │    │    │
  // │    │    │    │    │    └ day of week (0 - 7) (0 or 7 is Sun)
  // │    │    │    │    └───── month (1 - 12)
  // │    │    │    └────────── day of month (1 - 31)
  // │    │    └─────────────── hour (0 - 23)
  // │    └──────────────────── minute (0 - 59)
  // └───────────────────────── second (0 - 59, OPTIONAL)
  const runSchedule = (cron: string) => {
    logger.imp(`schedule ${cron}`);
    schedule.scheduleJob(cron, () => start(getBatch()));
  };

  const init = async () => {
    await pre();

    if (CRAWLER_CRON) {
      runSchedule(CRAWLER_CRON);
      return;
    }

    start(CRAWLER_BATCH);
  };

  return {
    init
  };
};

App().init();
