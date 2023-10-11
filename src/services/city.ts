/**
 * @file 城市数据抓取
 */

import logger from 'jet-logger';
import * as cheerio from 'cheerio';

import { get } from '@src/shared/request';
import { CityModel, City } from '@src/models/City';

const getCities = async () => {
  const url = 'https://m.lianjia.com/city/';

  const content = await get(url);

  const $ = cheerio.load(content.text);

  const cities: CityModel[] = [];

  $('.group').each((_, item) => {
    const group = $(item).find('h6').text();

    $(item)
      .find('.city_block > a')
      .each((_, item) => {
        const href = $(item).attr('href') as string;

        const zh_name = $(item).text();
        const en_name = href?.match(/\/([^/]+)\/$/)?.[1] as string;

        cities.push({
          group,
          href,
          zh_name,
          en_name
        });
      });
  });

  return cities;
};

(async () => {
  const result = await City.findAndCountAll();

  if (result.count) {
    const cities = await City.findAll();

    logger.info('query data success');
    logger.info(cities.map(city => city.dataValues.zh_name));

    return;
  }

  const cities = await getCities();

  await City.bulkCreate(cities);

  logger.info('insert data success');
  logger.info(cities.map(city => city.zh_name));
})();
