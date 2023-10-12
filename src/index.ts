import './pre-start'; // Must be the first import

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
    await pre();

    const options: CrawlerOptions = {
      type: CrawlerType.NEW_HOUSE,
      batch: '2023-10-12'
    };

    switch (options.type) {
      case CrawlerType.NEW_HOUSE:
        await LoupanService.run(options);
        break;
    }
  };

  return {
    start
  };
};

App().start();
