/**
 * @file 楼盘数据抓取 - 新房
 */
import logger from 'jet-logger';

import { get } from '@src/shared/request';
import { getCache, updateCache } from '@src/repos/RecordRepos';
import { getCities } from '@src/repos/CityRepos';
import { CrawlerOptions } from '@src/typings';

import { delay } from '@src/shared/tools';
import { bulkUpdate } from '@src/repos/NewHouseRepos';
import { NewHouseModel, NewHouse } from '@src/models/NewHouse';

const fetchData = async (city: string) => {
  const result: NewHouseModel[] = [];

  const _crawler = async (page: number) => {
    try {
      const res = await get(
        `https://m.lianjia.com/${city}/loupan/pg${page}/?_t=1&source=index`
      );
      const { error, data } = JSON.parse(res.text);

      if (error) {
        logger.err(error);
        return;
      }

      const { total, body } = data
      const { _resblock_list } = body;

      if (Array.isArray(_resblock_list) && _resblock_list.length) {
        result.push(...NewHouse.translateData(_resblock_list));

        logger.info(
          `${city} ${page} ${result.length} ${total}`
        );

        await delay();
        await _crawler(page + 1);
      }


    } catch (error) {
      logger.err(error);
    }
  };

  await _crawler(1);

  return result;
};

const unique = (history: string[], all: string[]) =>
  all.filter(k => !history.includes(k));

const run = async (options: CrawlerOptions) => {
  const { batch } = options;

  const cache = await getCache(batch);
  const cities = await getCities();

  const mappping = cities.reduce(
    (pre, cur) => ((pre[cur.dataValues.en_name] = cur.dataValues.zh_name), pre),
    {} as any
  );

  const keys = unique(
    cache,
    cities.map(city => city.dataValues.en_name)
  );

  while (keys.length) {
    const k = keys.shift() as string;

    logger.imp(`fetch start ${k}-${mappping[k]}`);

    const data = await fetchData(k);

    logger.imp(`fetch done ${k}-${mappping[k]} ${data.length}`);

    cache.push(k);

    await bulkUpdate(data);
    await updateCache(batch, cache);

    logger.imp(`insert data to database success`);

    await delay();
  }
};

export default {
  run
};
