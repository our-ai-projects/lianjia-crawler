import { City, CityModel } from '@src/models/City';

export const getCount = () => City.findAndCountAll();

export const getCities = () => City.findAll();

export const bulkUpdate = (cities: CityModel[]) => City.bulkCreate(cities);
