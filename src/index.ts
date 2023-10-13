import './pre-start'; // Must be the first import

import schedule from 'node-schedule';
import logger from 'jet-logger';

import { sync } from './models/sync';
import CityService from './services/CityService';
import LoupanService from './services/LoupanService';

import { CrawlerOptions, CrawlerType, Obj } from './typings';
import { getBatch, getEnvVars, jsonFormatted, unique } from './shared/tools';
import { getCache } from './repos/RecordRepos';
import { getCities } from './repos/CityRepos';

const App = () => {
  const envVars = getEnvVars();

  logger.imp(`${jsonFormatted(envVars)}`);

  const { CRAWLER_TYPE, CRAWLER_BATCH, CRAWLER_CRON } = envVars;

  const buildParams = async () => {
    await sync();
    await CityService.run();
  };

  const getExecutionVariables = async (cache: string[]) => {
    const cities = await getCities();

    const queue = unique(
      cache,
      cities.map(city => city.dataValues.en_name)
    );

    return {
      mapping: cities.reduce(
        (pre, cur) => (
          (pre[cur.dataValues.en_name] = cur.dataValues.zh_name), pre
        ),
        {} as Obj
      ),
      queue
    };
  };

  const start = async (batch: string) => {
    await buildParams();

    const { batchId, cache } = await getCache(CRAWLER_TYPE, batch);

    const { mapping, queue } = await getExecutionVariables(cache);

    if (queue.length === 0) {
      logger.imp(`batch ${batch} already fetched`);
      return;
    }

    const options: CrawlerOptions = {
      type: CRAWLER_TYPE,
      batchId,
      mapping,
      cache,
      queue
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
