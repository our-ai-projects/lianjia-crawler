/**
 * @file 城市数据抓取
 */

import logger from 'jet-logger';
import * as cheerio from 'cheerio';

import { get } from '@src/shared/request';

import { CityModel } from '@src/models/City';
import { bulkUpdate, getCount } from '@src/repos/CityRepos';

const fetchCities = async () => {
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

const run = async () => {
  const result = await getCount();

  if (result.count) return;

  const cities = await fetchCities();

  await bulkUpdate(cities);

  logger.info('insert cities data success');
  logger.info(cities.map(city => city.zh_name));
};

export default {
  run
};
