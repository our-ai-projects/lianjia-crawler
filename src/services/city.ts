/**
 * @file 城市数据抓取
 */

import * as cheerio from 'cheerio'
import { get } from '@src/shared/request'

interface City {
  group: string
  href: string
  zh_name: string
  en_name: string
}

const getCities = async () => {
  const url = 'https://m.lianjia.com/city/'

  const content = await get(url)

  const $ = cheerio.load(content.text)

  const cities: City[] = []

  $('.group').each((_, item) => {
    const group = $(item).find('h6').text()

    $(item)
      .find('.city_block > a')
      .each((_, item) => {
        const href = $(item).attr('href') as string

        const zh_name = $(item).text()
        const en_name = href?.match(/\/([^/]+)\/$/)?.[1] as string

        cities.push({
          group,
          href,
          zh_name,
          en_name
        })
      })
  })

  return cities
}

;(async () => {
  const cities = await getCities()

  console.log(cities.map(city => city.zh_name))
})()
