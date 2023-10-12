import { NewHouse, NewHouseModel } from '@src/models/NewHouse';

export const bulkUpdate = (data: NewHouseModel[]) => NewHouse.bulkCreate(data);
