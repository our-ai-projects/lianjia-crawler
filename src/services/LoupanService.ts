/**
 * @file 楼盘数据抓取 - 新房
 */
import logger from 'jet-logger';

import { get } from '@src/shared/request';
import { updateCache } from '@src/repos/RecordRepos';
import { CrawlerOptions } from '@src/typings';

import { delay } from '@src/shared/tools';
import { bulkUpdate } from '@src/repos/NewHouseRepos';
import { NewHouseModel, NewHouse } from '@src/models/NewHouse';

const fetchData = async <T>(city: string, callback: (data: any[]) => T[]) => {
  const result: T[] = [];

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

      const { total, body } = data;
      const { _resblock_list } = body;

      if (Array.isArray(_resblock_list) && _resblock_list.length) {
        result.push(...callback(_resblock_list));

        logger.info(`${city} ${page} ${result.length} ${total}`);

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

const run = async (options: CrawlerOptions) => {
  const { type, batchId, mapping, cache, queue } = options;

  const total = queue.length;

  while (queue.length) {
    const k = queue.shift() as string;

    logger.imp(`fetch ${k}-${mapping[k]}`);

    const data = await fetchData<NewHouseModel>(k, (data: any[]) =>
      NewHouse.translateData(data, batchId)
    );

    logger.imp(`fetch done ${k}-${mapping[k]} ${data.length}`);

    cache.push(k);

    await bulkUpdate(data);
    await updateCache(type, batchId, cache);

    logger.imp(`insert data success`);

    logger.imp(`total-${total} size-${queue.length}`);

    await delay();
  }
};

export default {
  run
};
